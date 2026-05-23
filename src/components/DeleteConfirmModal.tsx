"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  sectionName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const backdropFadeIn = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
  }
  to {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }
`;

const modalEntrance = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const dangerPulse = keyframes`
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
  }
`;

const Backdrop = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 3vw, 24px);
  box-sizing: border-box;
  animation: ${backdropFadeIn} 0.25s ease forwards;
  opacity: ${({ $closing }) => ($closing ? 0 : 1)};
  transition: opacity 0.2s ease, backdrop-filter 0.2s ease;
`;

const ModalBox = styled.div<{ $closing: boolean }>`
  background: #ffffff;
  border-radius: 24px;
  padding: clamp(28px, 4vw, 48px);
  width: clamp(320px, 90vw, 500px);
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.25),
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
  animation: ${modalEntrance} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  ${({ $closing }) =>
    $closing &&
    css`
      opacity: 0;
      transform: scale(0.9) translateY(10px);
      transition: all 0.2s ease;
      animation: none;
    `}
`;

const DangerRing = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fef2f2;
  border: 2px solid #fecaca;
  animation: ${dangerPulse} 2s ease infinite;
  color: #ef4444;
  font-size: 32px;
  line-height: 1;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 800;
  color: #111827;
  text-align: center;
  font-family: "Inter", sans-serif;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  line-height: 1.7;
  max-width: 340px;
  font-family: "Inter", sans-serif;
`;

const WarningBadge = styled.div`
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #c2410c;
  font-family: "Inter", sans-serif;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 14px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid #ef4444;
    outline-offset: 2px;
  }
`;

const CLOSE_DELAY_MS = 200;

const DeleteConfirmModal = ({
  isOpen,
  sectionName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setClosing(false);
    } else if (shouldRender && !closing) {
      setClosing(true);
      const timer = setTimeout(() => setShouldRender(false), CLOSE_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender, closing]);

  const runClose = useCallback(
    (callback: () => void) => {
      if (closing) return;
      setClosing(true);
      setTimeout(() => {
        setShouldRender(false);
        callback();
      }, CLOSE_DELAY_MS);
    },
    [closing]
  );

  useEffect(() => {
    if (!shouldRender || closing) return;

    cancelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        runClose(onCancel);
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, closing, onCancel, runClose]);

  if (!shouldRender) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      runClose(onCancel);
    }
  };

  const heading = sectionName
    ? `Delete '${sectionName}'?`
    : "Delete this section?";

  return (
    <Backdrop
      $closing={closing}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
      onClick={handleBackdropClick}
    >
      <ModalBox ref={modalRef} $closing={closing}>
        <DangerRing aria-hidden="true">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </DangerRing>

        <Heading id="delete-modal-title">{heading}</Heading>

        <Description id="delete-modal-desc">
          This action is permanent and cannot be undone. All content within this
          section — including images and text — will be lost forever.
        </Description>

        <WarningBadge>⚠ This cannot be recovered</WarningBadge>

        <ButtonRow>
          <CancelButton
            type="button"
            ref={cancelRef}
            onClick={() => runClose(onCancel)}
          >
            Cancel
          </CancelButton>
          <DeleteButton type="button" onClick={() => runClose(onConfirm)}>
            <FontAwesomeIcon icon={faTrash} />
            Yes, Delete it
          </DeleteButton>
        </ButtonRow>
      </ModalBox>
    </Backdrop>
  );
};

export default DeleteConfirmModal;

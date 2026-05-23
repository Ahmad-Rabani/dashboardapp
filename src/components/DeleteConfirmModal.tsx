"use client";

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const modalShake = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 3vw, 24px);
  box-sizing: border-box;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: clamp(24px, 3vw, 40px);
  width: clamp(300px, 90vw, 480px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${modalFadeIn} 0.2s ease;
  box-sizing: border-box;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  color: #ef4444;
  font-size: 40px;
  line-height: 1;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700;
  text-align: center;
  color: #111827;
  font-family: "Inter", sans-serif;
`;

const Subtext = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
  font-family: "Inter", sans-serif;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  transition: background 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }

  &:focus-visible {
    outline: 2px solid #6366f1;
    outline-offset: 2px;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  animation: ${modalShake} 0.4s ease 0.1s;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }

  &:focus-visible {
    outline: 2px solid #ef4444;
    outline-offset: 2px;
  }
`;

const DeleteConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
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
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <Backdrop
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
      onClick={handleBackdropClick}
    >
      <ModalBox ref={modalRef}>
        <IconWrap aria-hidden="true">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </IconWrap>
        <Heading id="delete-modal-title">Delete this section?</Heading>
        <Subtext id="delete-modal-desc">
          This action cannot be undone. The section and all its content will be
          permanently removed.
        </Subtext>
        <ButtonRow>
          <CancelButton type="button" ref={cancelRef} onClick={onCancel}>
            Cancel
          </CancelButton>
          <DeleteButton type="button" onClick={onConfirm}>
            Delete
          </DeleteButton>
        </ButtonRow>
      </ModalBox>
    </Backdrop>
  );
};

export default DeleteConfirmModal;

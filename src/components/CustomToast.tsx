"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import toast, { Toast } from "react-hot-toast";

export type ToastType = "success" | "error" | "info" | "warning";

export interface CustomToastProps {
  t: Toast;
  type: ToastType;
  title: string;
  description?: string;
  icon: React.ReactNode;
  accentColor: string;
  duration?: number;
}

const toastSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const progressShrink = keyframes`
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
`;

const ToastContainer = styled.div<{ $visible: boolean; $accentColor: string }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 420px;
  padding: 14px 16px 18px 0;
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  box-sizing: border-box;
  border-left: 4px solid ${({ $accentColor }) => $accentColor};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.97)"};
  transition: all 0.3s ease;
  animation: ${({ $visible }) => ($visible ? toastSlideIn : "none")} 0.35s ease
    forwards;
  backdrop-filter: blur(8px);
`;

const IconCircle = styled.div<{ $accentColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: ${({ $accentColor }) => `${$accentColor}18`};
  color: ${({ $accentColor }) => $accentColor};
  font-size: 16px;
  margin-left: 14px;
`;

const TextBlock = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  font-family: "Inter", sans-serif;
  line-height: 1.3;
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
  font-family: "Inter", sans-serif;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #9ca3af;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  margin-right: 4px;
  transition: background 0.15s ease, color 0.15s ease;
  font-family: "Inter", sans-serif;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const ProgressTrack = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #f3f4f6;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ $accentColor: string; $duration: number; $paused: boolean }>`
  height: 100%;
  background: ${({ $accentColor }) => $accentColor};
  transform-origin: left center;
  animation: ${progressShrink} ${({ $duration }) => $duration}ms linear forwards;
  animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
`;

const CustomToast = ({
  t,
  type,
  title,
  description,
  icon,
  accentColor,
  duration = 3500,
}: CustomToastProps) => {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!t.visible) {
      setPaused(true);
    }
  }, [t.visible]);

  return (
    <ToastContainer
      $visible={t.visible}
      $accentColor={accentColor}
      role="status"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <IconCircle $accentColor={accentColor} aria-hidden="true">
        {icon}
      </IconCircle>

      <TextBlock>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </TextBlock>

      <CloseButton
        type="button"
        aria-label="Dismiss notification"
        onClick={() => toast.dismiss(t.id)}
      >
        ×
      </CloseButton>

      <ProgressTrack aria-hidden="true">
        <ProgressBar $accentColor={accentColor} $duration={duration} $paused={paused} />
      </ProgressTrack>
    </ToastContainer>
  );
};

export default CustomToast;

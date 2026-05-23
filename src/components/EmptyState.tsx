"use client";

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface EmptyStateProps {
  onAddSection?: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: clamp(24px, 5vw, 48px);
  box-sizing: border-box;
  text-align: center;
`;

const IconWrap = styled.div`
  color: #9ca3af;
  font-size: clamp(48px, 10vw, 64px);
  line-height: 1;
  margin-bottom: clamp(12px, 2vw, 20px);
`;

const Title = styled.h2`
  margin: 0 0 clamp(8px, 1.5vw, 12px);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  color: #1f2937;
  font-family: "Inter", sans-serif;
`;

const Subtitle = styled.p`
  margin: 0 0 clamp(20px, 3vw, 28px);
  font-size: clamp(13px, 1.5vw, 15px);
  color: #6b7280;
  max-width: 28rem;
  line-height: 1.6;
  font-family: "Inter", sans-serif;
`;

const CtaButton = styled.button`
  min-height: 44px;
  padding: clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px);
  border: none;
  border-radius: 10px;
  background: linear-gradient(145deg, #0f0f6c, #191981);
  color: #fff;
  font-size: clamp(14px, 1.5vw, 15px);
  font-weight: 600;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(15, 15, 108, 0.25);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(15, 15, 108, 0.35);
    transform: translateY(-1px);
  }
`;

const EmptyState = ({ onAddSection }: EmptyStateProps) => {
  return (
    <Wrapper>
      <IconWrap aria-hidden="true">
        <FontAwesomeIcon icon={faLayerGroup} />
      </IconWrap>
      <Title>No sections yet</Title>
      <Subtitle>
        Click the Add Section button to create your first section and start
        building your page.
      </Subtitle>
      {onAddSection && (
        <CtaButton type="button" onClick={onAddSection}>
          Add Section
        </CtaButton>
      )}
    </Wrapper>
  );
};

export default EmptyState;

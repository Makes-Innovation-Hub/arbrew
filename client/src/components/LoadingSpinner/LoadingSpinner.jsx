import React from "react";
import styled, { keyframes } from "styled-components";

// Define keyframes for spinner spin animation
const spinnerSpin = keyframes`
  0% {
    transform: rotate(0turn);
  }
  100% {
    transform: rotate(1turn);
  }
`;

// Styled components
const SpinnerContainer = styled.div`
  position: relative;
  width: var(--size);
  height: var(--size);
`;

const SpinnerItem = styled.i`
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  opacity: 0.8;
  animation: ${spinnerSpin} var(--speed) ease 0.1s infinite;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-width: var(--border-width);
  border-style: dotted;
  border-bottom-color: var(--default-color);

  &:first-child {
    z-index: 1;
    animation: ${spinnerSpin} var(--speed) ease infinite;
    border-style: solid;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: var(--default-color);
  }
`;

// Component
const LoadingSpinner = () => {
  return (
    <div
      className="spinner-div"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SpinnerContainer
        style={{
          "--size": "3rem",
          "--speed": "1s",
          "--border-width": "4px",
          "--default-color": "rgb(24, 201, 100)",
        }}
      >
        <SpinnerItem className="spinner_item spinner_item--success"></SpinnerItem>
        <SpinnerItem className="spinner_item spinner_item--success"></SpinnerItem>
      </SpinnerContainer>
    </div>
  );
};

export default LoadingSpinner;

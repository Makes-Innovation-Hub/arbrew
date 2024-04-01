import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

export const StyledMyJobPage = styled.div`
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 2.5rem 2.5rem 0 0;
  padding: 1rem;
  position: relative;
  top: 8rem;
  left: 0;
  z-index: 2;
  width: 100%;

  /* @media (min-width: 1000px) {
    padding: 3rem;
    width: 100vw;
    border-radius: 4rem 4rem 0 0;
    top: 9rem;
    align-items: center;
  } */
`;

export const Title = styled.h2`
  color: #161616;
  font-family: Poppins;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* margin-bottom: 20px; */
  margin-top: 20px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  @media (min-width: 1000px) {
    justify-content: center;
  }
`;
export const StyledJobText = styled.span`
  color: #5b5b5b;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 1000px) {
    justify-content: center;
  }
`;

export const FirstSection = styled.div`
  max-width: 390px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  border-bottom: 1px solid var(--gray-200, #e2e8f0);
  @media (min-width: 1000px) {
    justify-content: center;
  }
`;

export const StyledImg = styled.img`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 50%;
`;

export const StyledName = styled.h1`
  color: #161616;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export const StyledUnderName = styled.h2`
  color: #5b5b5b;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

export const SecondSection = styled.div`
  padding: 0 0 16px 0;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const DescriptionSection = styled.div`
  margin-top: 5px;
  margin-left: 20px;
  color: #3d4260;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border-bottom: 1px solid var(--gray-200, #e2e8f0);
`;
export const AppliedSection = styled.div`
  margin-left: 20px;
  padding: 0 0 16px 0;
  color: #3d4260;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  border-bottom: 1px solid var(--gray-200, #e2e8f0);
  cursor: pointer;
`;
export const OtherPageButton = styled.button`
  border-radius: 0.6rem;
  border: none;
  width: 34rem;
  height: 5rem;
  padding: 1rem 0.5rem 1rem 0.5rem;
  cursor: pointer;
  background-color: ${({ bg }) => bg || "#50924E"};
  /* position: fixed; */
  left: 50%;
  transform: translateX(10%);
  bottom: 2rem;
  color: #fff;
  font-style: italic;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ hoverBg }) => hoverBg || "#396d37"};
  }
`;
export const StyledAppliersTitle = styled.h1`
  color: #161616;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export const SendButton = styled.button`
  background-color: ${({ isSent }) => (isSent ? "#ff0000" : "#50924e")};
  color: white;
  font-family: ABeeZee;
  font-weight: 400;
  font-style: italic;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  width: 80%;
  margin: 8px;
  padding: 16px 8px 16px 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 80px 20px;
  cursor: pointer;
`;

export const JopPostButton = styled.button`
  width: 34rem;
  height: 5rem;
  padding: 1rem 0.5rem 1rem 0.5rem;
  background-color: ${({ bg }) => bg || "#50924E"};
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ hoverBg }) => hoverBg || "#396d37"};
  }
`;
export const UpdateSection = styled.div`
  margin-left: 92%;
`;

export const EDSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  cursor: pointer;
`;
export const DSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  cursor: pointer;
`;

export const EditButton = styled.button`
  border-radius: 0.6rem;
  border: none;
  width: 112px;
  height: 48px;
  padding: 16px, 8px, 16px, 8px;
  cursor: pointer;
  background-color: ${({ bg }) => bg || "#50924E"};
  /* position: fixed; */
  /* left: 50%; */
  /* transform: translateX(10%); */
  bottom: 2rem;
  color: #fff;
  font-style: italic;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ hoverBg }) => hoverBg || "#396d37"};
  }
`;

export const DeleteButton = styled.button`
  border-radius: 0.6rem;
  border: none;
  width: 112px;
  height: 48px;
  padding: 16px, 8px, 16px, 8px;
  cursor: pointer;
  background-color: ${({ bg }) => bg || "#E81B42"};
  /* position: fixed; */
  /* left: 50%; */
  /* transform: translateX(10%); */
  bottom: 2rem;
  color: #fff;
  font-style: italic;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ hoverBg }) => hoverBg || "#E81B42c3"};
  }
`;
export const DeleteTitle = styled.h1`
  color: #161616;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
`;
export const StyledSendResumeButton = styled.button`
  background-color: ${({ isApplied }) => (isApplied ? "#ff0000" : "#50924e")};
  color: white;
  font-family: ABeeZee;
  font-weight: 400;
  font-style: italic;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  width: 80%;
  margin-left: 10%;
  padding: 16px 8px 16px 8px;
  border-radius: 8px;
  transition: background-color 0.3s;
  cursor: ${({ isApplied }) => (isApplied ? "not-allowed" : "pointer")};
  pointer-events: ${({ isApplied }) => (isApplied ? "none" : "auto")};
  &:hover {
    opacity: ${({ isApplied }) => (isApplied ? "1" : "0.8")};
  }
`;

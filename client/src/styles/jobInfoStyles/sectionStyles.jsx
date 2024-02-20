import styled from "styled-components";

export const StyledSection = styled.div`
  flex-direction: ${({ direction }) => direction};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  display: flex;
  justify-content: center;
  align-items: center;
`;

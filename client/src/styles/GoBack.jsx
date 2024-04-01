import styled from "styled-components";
export const GoBack = styled.div`
  display: flex;
  position: absolute;
  width: 1rem;
  right: 32px;
  z-index: 300;
  ${(props) => props.id && `id: ${props.id};`}
`;
export default GoBack;

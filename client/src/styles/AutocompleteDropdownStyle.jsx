import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative; /* Position relative to parent */
`;

export const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 999; /* Ensure the dropdown appears above other content */
`;

export const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

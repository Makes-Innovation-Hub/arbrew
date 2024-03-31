import React from "react";
import {
  DropdownContainer,
  StyledDropdown,
  DropdownItem,
} from "../../../styles/AutocompleteDropdownStyle";

const AutocompleteDropdown = ({ suggestions, handleSuggestionClick }) => {
  // Sort suggestions alphabetically by address
  const sortedSuggestions = suggestions.sort((a, b) =>
    a.properties.formatted.localeCompare(b.properties.formatted)
  );

  return (
    <DropdownContainer>
      <StyledDropdown>
        {sortedSuggestions.map((suggestion, index) => (
          <DropdownItem
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.properties.formatted}
          </DropdownItem>
        ))}
      </StyledDropdown>
    </DropdownContainer>
  );
};

export default AutocompleteDropdown;

import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import {
  StyledPage,
  StyledMargin,
  StyledButton,
  StyledPageTitle,
  StyledInput,
} from "../../styles";
import { ArrowLeft } from "../../assets";
import { addDetail } from "../../features/userRegister/userRegisterSlice";
import AutocompleteDropdown from "../Meetup/AutocompleteDropdown/AutocompleteDropdown";
const Location = () => {
  const loggedUser = useSelector((state) => state.userRegister);
  const [location, setLocation] = useState({
    value: loggedUser?.userDetails?.address || "",
    field: "address",
  });
  const [suggestions, setSuggestions] = useState([]);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const { value } = location;

  const handleLocationChange = useCallback(async (e) => {
    const currentValue = e.target.value;
    if (!currentValue.trim()) {
      setLocation({ ...location, value: "" });
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const apiKey = import.meta.env.VITE_ADDRESS_TOKEN;
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          currentValue.trim()
        )}&limit=5&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setSuggestions(data.features);
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    }, 300);
    setLocation({ ...location, value: currentValue });
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setLocation({ ...location, value: suggestion.properties.formatted });
    setSuggestions([]);
  };

  return (
    <div>
      <Header
        leftIcon={
          <Link to="/nationalityPage">
            <ArrowLeft />
          </Link>
        }
        title={"Add Location"}
      />
      <StyledPage>
        <StyledMargin direction="vertical" margin="1.75rem" />
        <StyledMargin direction="horizontal" margin="35rem">
          <StyledPageTitle>Add your Location</StyledPageTitle>
        </StyledMargin>
        <StyledMargin direction="vertical" margin="9.25rem" />
        <div style={{ width: "100%" }}>
          <StyledInput
            style={{ margin: "auto" }}
            type="text"
            value={value}
            onChange={handleLocationChange}
            placeholder="Add Location"
            borderColor="#1E75E5"
          />
          {suggestions?.length > 0 && (
            <AutocompleteDropdown
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
        <StyledButton
          to={value ? "/gender" : null}
          onClick={() => {
            if (!value) {
              return;
            }
            dispatch(addDetail(location));
            setLocation({ ...location, value: "" });
          }}
          bg={value ? "#50924E" : "#d7ddd6"}
          hoverBg={value ? "#396d37" : "#d7ddd6"}
          text={"Save & Next"}
        ></StyledButton>
      </StyledPage>
    </div>
  );
};
export default Location;

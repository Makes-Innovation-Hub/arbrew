import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import {
  StyledPage,
  StyledMargin,
  StyledButton,
  StyledPageTitle,
  StyledInput,
  StyledSpan,
  Flex,
} from "../../styles";
import { ArrowLeft } from "../../assets";
import { addDetail } from "../../features/userRegister/userRegisterSlice";
const popularWorkFields = [
  "Accounting",
  "Aerospace",
  "Agriculture",
  "Architecture",
  "Art",
  "Automotive",
  "Banking",
  "Biotechnology",
  "Chemical",
  "Civil Engineering",
  "Computer Hardware",
  "Computer Software",
  "Construction",
  "Consulting",
  "Consumer Goods",
  "Cosmetics",
  "Defense",
  "Education",
  "Electronics",
  "Energy",
  "Entertainment",
  "Environmental",
  "Fashion",
  "Finance",
  "Food Industry",
  "Government",
  "Healthcare",
  "Hospitality",
  "Human Resources",
  "Information Technology",
  "Insurance",
  "Internet",
  "Legal",
  "Logistics",
  "Manufacturing",
  "Marketing",
  "Media",
  "Medical",
  "Mining",
  "Music",
  "Nonprofit",
  "Oil & Gas",
  "Pharmaceutical",
  "Real Estate",
  "Retail",
  "Science",
  "Sports",
  "Telecommunications",
  "Transportation",
  "Travel",
  "Utilities",
  "Video Game",
  "Web Development",
  "Writing & Editing",
  "Other",
];
const Occupation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { occupation, workField } = useSelector(
    (state) => state.userRegister.userDetails
  );
  const [occupationInput, setOccupationInput] = useState({
    field: "occupation",
    value: occupation || "",
  });
  const [workFieldInput, setWorkFieldInput] = useState({
    field: "workField",
    value: workField || "",
  });
  const [showWorkFields, setShowWorkFields] = useState(false);
  const [filteredWorkFields, setFilteredWorkFields] = useState([]);
  const { value: occupationValue } = occupationInput;
  const { value: workFieldValue } = workFieldInput;
  const handleWorkFieldChange = (e) => {
    const value = e.target.value;
    setWorkFieldInput({ ...workFieldInput, value });
    // Filter the work fields based on the input value for autocomplete
    const filtered = popularWorkFields.filter((field) =>
      field.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredWorkFields(filtered);
    setShowWorkFields(true);
  };
  const handleWorkFieldSelect = (field) => {
    setWorkFieldInput({ ...workFieldInput, value: field });
    setShowWorkFields(false);
  };
  const handleSaveAndNext = () => {
    dispatch(addDetail(occupationInput));
    dispatch(addDetail(workFieldInput));
    setOccupationInput({ ...occupationInput, value: "" });
    setWorkFieldInput({ ...workFieldInput, value: "" });
    navigate("/resumePage");
  };
  return (
    <div>
      <Header
        leftIcon={
          <Link to="/bioPage">
            <ArrowLeft />
          </Link>
        }
        title={"Add Occupation"}
      />
      <StyledPage>
        <StyledMargin direction="vertical" margin="1.75rem" />
        <StyledMargin direction="horizontal" margin="35rem">
          <StyledPageTitle>Add your Work Field</StyledPageTitle>
        </StyledMargin>
        <StyledMargin direction="vertical" margin="1.8rem" />
        {/* Combined Input Field */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <StyledInput
            type="text"
            value={workFieldValue}
            onChange={handleWorkFieldChange}
            placeholder="Choose or write here..."
            autoComplete="off"
            style={{ flex: 1 }}
          />
          <div
            onClick={() => setShowWorkFields(!showWorkFields)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #000",
              }}
            ></div>
          </div>
          {showWorkFields && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 2,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              {filteredWorkFields.map((field, index) => (
                <div
                  key={index}
                  onClick={() => handleWorkFieldSelect(field)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {field}
                </div>
              ))}
            </div>
          )}
        </div>
        <StyledMargin direction="vertical" margin="2.5rem" />
        <StyledMargin direction="horizontal" margin="35rem">
          <StyledPageTitle>Add your Occupation</StyledPageTitle>
        </StyledMargin>
        <StyledMargin direction="vertical" margin="1.8rem" />
        <StyledInput
          type="text"
          value={occupationValue}
          maxLength={30}
          onChange={(e) =>
            setOccupationInput({ ...occupationInput, value: e.target.value })
          }
          placeholder="Write Here... For example: Doctor"
        />
        <StyledMargin direction="vertical" margin="2.6rem" />
        <Flex>
          <StyledMargin direction="horizontal" margin="25rem" />
          <StyledSpan fontSize="12px" color="#7F8790" alignSelf="flex-end">
            30 Character
          </StyledSpan>
        </Flex>
        <StyledButton
          to={"/resumePage"}
          disabled={!occupationValue || !workFieldValue}
          onClick={handleSaveAndNext}
          bg={occupationValue && workFieldValue ? "#50924E" : "#D7DDD6"}
          hoverBg={occupationValue && workFieldValue ? "#396D37" : "#D7DDD6"}
          text={"Save & Next"}
        ></StyledButton>
      </StyledPage>
    </div>
  );
};
export default Occupation;

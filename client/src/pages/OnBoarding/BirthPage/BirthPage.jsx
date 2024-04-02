import { BackLayout } from "../../../styles/PageLayout/BackLayout.jsx";
import { HeaderWrapper } from "../../../styles/PageLayout/HeaderWrapper.jsx";
import { TitleWrapper } from "../../../styles/PageLayout/TitleWrapper.jsx";
import { PageTitle } from "../../../styles/PageLayout/PageTitle.jsx";
import { Container } from "../../../styles/PageLayout/Container.jsx";
import { StyledRouterLink } from "../../../styles/StyledRouterLink.jsx";
import { Flex } from "../../../styles/Flex.jsx";
import { InstructionPrompt } from "../../../styles/BioPage/InstructionPrompt.jsx";
import { StyledSaveAndNextButton } from "../../../styles/BioPage/StyledSaveAndNextButton.jsx";
import { BioStyledDiv } from "../../../styles/BioPage/BioStyledDiv.jsx";
import CustomDropdown from "../../../styles/BirthPage/StyledDropDown.jsx";
import { useState, useEffect } from "react";
import arrowIcon from "../../../assets/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addDetail } from "../../../features/userRegister/userRegisterSlice.jsx";
import StyledButton from "../../../styles/StyledButton.jsx";

export default function BirthPage() {
  const loggedUser = useSelector((state) => state.userRegister);
  const [startYear, setStartYear] = useState(1980);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState({
    value: loggedUser?.userDetails?.yearOfBirth || "",
    field: "yearOfBirth",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = startYear; year <= currentYear - 4; year++) {
      yearsArray.push({ label: year, value: year });
    }
    setYears(yearsArray);
  }, [startYear]);

  const dispatch = useDispatch();

  return (
    <BackLayout>
      <HeaderWrapper>
        {/* do not remove this div even if it is empty */}
        <div style={{ width: "20%" }}>
          <Link to="/interests">
            <img src={arrowIcon} />
          </Link>
        </div>
        <TitleWrapper>
          <PageTitle>Add Age</PageTitle>
        </TitleWrapper>

        {/* do not remove this div even if it is empty */}
        <div style={{ width: "20%" }}>
          {/*  here you can add code for additional elements in the header */}
        </div>
      </HeaderWrapper>
      <Container>
        {/* here you can add code for the container page */}
        <Flex
          style={{
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Flex
            style={{
              height: "10%",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <InstructionPrompt>Add your Year of Birth</InstructionPrompt>
          </Flex>
          <BioStyledDiv>
            <CustomDropdown
              optionsArray={years}
              placeHolder="Year"
              selected={selectedYear}
              setSelected={setSelectedYear}
              isSearchable={false}
            />
          </BioStyledDiv>
          <Flex style={{ height: "20%", width: "100%" }}>
            {/* <StyledRouterLink to={"/nationality"}> */}
            <StyledButton
              to={
                selectedYear.value !== undefined || selectedYear.value !== null
                  ? "/nationalityPage"
                  : null
              }
              onClick={() => {
                if (
                  selectedYear.value !== undefined &&
                  selectedYear.value !== null
                ) {
                  dispatch(
                    addDetail({
                      field: selectedYear.field,
                      value: selectedYear.value.toString(),
                    })
                  );
                }
              }}
              bg={selectedYear.value ? "#50924E" : "#D7DDD6"}
              hoverBg={selectedYear.value ? "#396D37" : "#D7DDD6"}
              text={"Save & Next"}
            ></StyledButton>
            {/* </StyledRouterLink> */}
          </Flex>
        </Flex>
      </Container>
    </BackLayout>
  );
}

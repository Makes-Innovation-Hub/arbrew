import { BackLayout } from "../../../styles/PageLayout/BackLayout.jsx";
import { HeaderWrapper } from "../../../styles/PageLayout/HeaderWrapper.jsx";
import { TitleWrapper } from "../../../styles/PageLayout/TitleWrapper.jsx";
import { PageTitle } from "../../../styles/PageLayout/PageTitle.jsx";
import { Container } from "../../../styles/PageLayout/Container.jsx";
import { Flex } from "../../../styles/Flex.jsx";
import { InstructionPrompt } from "../../../styles/BioPage/InstructionPrompt.jsx";
import { StyledSaveAndNextButton } from "../../../styles/BioPage/StyledSaveAndNextButton.jsx";
import { BioStyledDiv } from "../../../styles/BioPage/BioStyledDiv.jsx";
import arrowIcon from "../../../assets/arrow.svg";
import { useState } from "react";
import CustomDropdown from "../../../styles/BirthPage/StyledDropDown.jsx";
import Option from "../../../styles/NationalityPage/CountriesCustomOPtions.jsx";
import countries from "../../../assets/countriesAndFlags/countries.json";
import { useNavigate, Link } from "react-router-dom";
import { addDetail } from "../../../features/userRegister/userRegisterSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../../../styles/StyledButton.jsx";
export default function NationalityPage() {
  const loggedUser = useSelector((state) => state.userRegister);
  const [selectedNationality, setSelectedNationality] = useState({
    value: loggedUser?.userDetails?.nationality || "",
    field: "nationality",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <BackLayout>
      <HeaderWrapper>
        {/* do not remove this div even if it is empty */}
        <div style={{ width: "20%" }}>
          <Link to="/agePage">
            <img src={arrowIcon} />
          </Link>
        </div>
        <TitleWrapper>
          <PageTitle>Add Nationality</PageTitle>
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
            <InstructionPrompt>Add your Nationality</InstructionPrompt>
          </Flex>
          <BioStyledDiv>
            <CustomDropdown
              optionsArray={countries}
              placeHolder="Select"
              selected={selectedNationality}
              setSelected={setSelectedNationality}
              isSearchable={false}
              customOption={Option}
            />
          </BioStyledDiv>
          <Flex style={{ height: "20%", width: "100%" }}>
            <StyledButton
              to={selectedNationality.value ? "/location" : null}
              onClick={() => {
                if (!selectedNationality.value) {
                  return;
                }
                dispatch(addDetail(selectedNationality));
                setSelectedNationality({ ...selectedNationality, value: "" });
              }}
              bg={selectedNationality.value ? "#50924E" : "#D7DDD6"}
              hoverBg={selectedNationality.value ? "#396D37" : "#D7DDD6"}
              text={"Save & Next"}
            ></StyledButton>
          </Flex>
        </Flex>
      </Container>
    </BackLayout>
  );
}

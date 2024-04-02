import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import {
  Flex,
  StyledPage,
  StyledMargin,
  StyledButton,
  StyledLanguageButton,
  StyledPageTitle,
} from "../../styles";
import { ArrowLeft, MaleIcon, FemaleIcon } from "../../assets";
import { addDetail } from "../../features/userRegister/userRegisterSlice";

const GenderSelection = () => {
  const loggedUser = useSelector((state) => state.userRegister);
  const [gender, setGender] = useState({
    value: loggedUser?.userDetails?.gender || "",
    field: "gender",
  });

  const dispatch = useDispatch();
  const { value } = gender;

  return (
    <div>
      <Header
        leftIcon={
          <Link to="/location">
            <ArrowLeft />
          </Link>
        }
        title={"Add Gender"}
      />
      <StyledPage>
        <StyledMargin direction="vertical" margin="1.75rem" />
        <StyledMargin direction="horizontal" margin="35rem">
          <StyledPageTitle>Add your Gender</StyledPageTitle>
        </StyledMargin>
        <StyledMargin direction="vertical" margin="9.25rem" />
        <Flex>
          <MaleIcon />
          <StyledMargin direction="horizontal" margin="0.9rem" />
          <StyledLanguageButton
            bg={value === "Male" ? "#50924E" : "#FFFFFF"}
            color={value === "Male" ? "#FFFFFF" : "#000000"}
            onClick={() => setGender({ ...gender, value: "Male" })}
          >
            Male
          </StyledLanguageButton>
        </Flex>
        <StyledMargin direction="vertical" margin="3rem" />
        <Flex>
          <FemaleIcon />
          <StyledMargin direction="horizontal" margin="0.9rem" />
          <StyledLanguageButton
            bg={value === "Female" ? "#50924E" : "#FFFFFF"}
            color={value === "Female" ? "#FFFFFF" : "#000000"}
            onClick={() => setGender({ ...gender, value: "Female" })}
          >
            Female
          </StyledLanguageButton>
        </Flex>
        <StyledMargin direction="vertical" margin="3rem" />
        <Flex>
          <StyledMargin direction="horizontal" margin="3rem" />
          <StyledMargin direction="horizontal" margin="0.9rem" />
          <StyledLanguageButton
            bg={value === "Other" ? "#50924E" : "#FFFFFF"}
            color={value === "Other" ? "#FFFFFF" : "#000000"}
            onClick={() => setGender({ ...gender, value: "Other" })}
          >
            Other
          </StyledLanguageButton>
        </Flex>
        <StyledButton
          to={value ? "/bioPage" : null}
          onClick={() => {
            if (!value) {
              return;
            }
            dispatch(addDetail(gender));
            setGender({ ...gender, value: "" });
          }}
          bg={value ? "#50924E" : "#d7ddd6"}
          hoverBg={value ? "#396d37" : "#d7ddd6"}
          text={"Save & Next"}
        ></StyledButton>
      </StyledPage>
    </div>
  );
};
export default GenderSelection;

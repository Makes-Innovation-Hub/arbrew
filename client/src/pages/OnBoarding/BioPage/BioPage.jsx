import { BackLayout } from "../../../styles/PageLayout/BackLayout.jsx";
import { HeaderWrapper } from "../../../styles/PageLayout/HeaderWrapper.jsx";
import { TitleWrapper } from "../../../styles/PageLayout/TitleWrapper.jsx";
import { PageTitle } from "../../../styles/PageLayout/PageTitle.jsx";
import { Container } from "../../../styles/PageLayout/Container.jsx";
import { Flex } from "../../../styles/Flex.jsx";
import { InstructionPrompt } from "../../../styles/BioPage/InstructionPrompt.jsx";
import { StyledTextArea } from "../../../styles/BioPage/StyledTextArea.jsx";
import { StyledSaveAndNextButton } from "../../../styles/BioPage/StyledSaveAndNextButton.jsx";
import { StyledNumberOfCharLabel } from "../../../styles/BioPage/StyledNumberOfCharLabel.jsx";
import { BioStyledDiv } from "../../../styles/BioPage/BioStyledDiv.jsx";
import arrowIcon from "../../../assets/arrow.svg";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDetail } from "../../../features/userRegister/userRegisterSlice.jsx";
import { useSelector } from "react-redux";
import { useRegisterUserMutation } from "../../../features/userDataApi.js";
import StyledButton from "../../../styles/StyledButton.jsx";
import Modal from "../../../styles/Modal/Modal.jsx";
export default function BioPage() {
  const loggedUser = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();
  const [text, setText] = useState({
    value: loggedUser?.userDetails?.bio || "",
    field: "bio",
  });
  const [isDetailAdded, setIsDetailAdded] = useState(false);
  const [isMaxError, setIsMaxError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const userData = useSelector((state) => state.userRegister);
  // const [registerUser, { isSuccess, isError, error }] =
  //   useRegisterUserMutation();
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setText({ ...text, value: inputValue });
  };
  const characterCount = text.value.length;
  const navigate = useNavigate();

  useEffect(() => {
    if (text.value.length === 500) {
      setIsMaxError(true);
      setShowModal(true);
      setModalText("Your bio should not exceed 500 characters");
    }
  }, [characterCount]);

  // useEffect(() => {
  //   if (isDetailAdded) {
  //     registerUser(userData);
  //   }
  // }, [isDetailAdded]);
  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/occupation");
  //   }
  //   if (isError) {
  //     console.error(error);
  //   }
  // }, [isSuccess, isError]);
  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/occupation");
  //   }
  //   if (isError) {
  //     console.error(error);
  //   }
  // }, [isSuccess, isError]);
  return (
    <BackLayout>
      <HeaderWrapper>
        {/* do not remove this div even if it is empty */}
        <div style={{ width: "20%" }}>
          <Link to="/gender">
            <img src={arrowIcon} />
          </Link>
        </div>
        <TitleWrapper>
          <PageTitle>Add Bio</PageTitle>
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
            <InstructionPrompt>Add your Bio Description</InstructionPrompt>
          </Flex>
          <BioStyledDiv>
            <StyledTextArea
              value={text.value}
              onChange={handleChange}
              placeholder="Write here...For example: I'm John Doe and Cooking for me is a way of living."
              maxLength={500}
            ></StyledTextArea>
            <StyledNumberOfCharLabel>
              {500 - characterCount} character
            </StyledNumberOfCharLabel>
          </BioStyledDiv>
          <Flex style={{ height: "20%", width: "100%" }}>
            {isMaxError && (
              <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                modalText={modalText}
              />
            )}
            <StyledButton
              disabled={!text.value}
              onClick={() => {
                dispatch(addDetail(text));
                navigate("/occupation");
              }}
              bg={text.value ? "#50924E" : "#d7ddd6"}
              hoverBg={text.value ? "#396d37" : "#d7ddd6"}
              text={"Save & Next"}
            ></StyledButton>
          </Flex>
        </Flex>
      </Container>
    </BackLayout>
  );
}

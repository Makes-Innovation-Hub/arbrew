import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import {
  StyledPage,
  StyledMargin,
  StyledButton,
  StyledPageTitle,
  StyledInput,
  StyledSpan,
  Flex,
} from "../../../styles";
import { ArrowLeft } from "../../../assets";
import {
  addAllDetailsConnectedUser,
  addDetail,
} from "../../../features/userRegister/userRegisterSlice";
import { StyledTextArea } from "../../../styles/BioPage/StyledTextArea";
import { useRegisterUserMutation } from "../../../features/userDataApi";
import { useEffect } from "react";
import Modal from "../../../styles/Modal/Modal";

function ResumePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { resume } = useSelector((state) => state.userRegister.userDetails);
  const userData = useSelector((state) => state.userRegister);
  const [isDetailAdded, setIsDetailAdded] = useState(false);
  const [isMaxError, setIsMaxError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [registerUser, { isSuccess, isError, error }] =
    useRegisterUserMutation();
  const [resumeInput, setResumeInput] = useState({
    field: "resume",
    value: userData?.userDetails?.resume || "",
  });
  const { value } = resumeInput;
  const characterCount = value.length; // to save the number of char written
  useEffect(() => {
    const asyncRegister = async () => {
      if (isDetailAdded) {
        const result = await registerUser(userData).unwrap();
        dispatch(addAllDetailsConnectedUser(result.data));
      }
    };
    asyncRegister();
  }, [isDetailAdded]);

  useEffect(() => {
    if (value.length === 500) {
      setIsMaxError(true);
      setShowModal(true);
      setModalText("Your bio should not exceed 500 characters");
    }
  }, [characterCount]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/chooseHub");
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, isError]);
  return (
    <div>
      <Header
        leftIcon={
          <Link to="/occupation">
            <ArrowLeft />
          </Link>
        }
        title={"Add Resume"}
      />
      <StyledPage>
        <StyledMargin direction="vertical" margin="2.5rem" />
        <StyledMargin direction="horizontal" margin="35rem">
          <StyledPageTitle>Add your Work Resume </StyledPageTitle>
        </StyledMargin>
        <StyledMargin direction="vertical" margin="1.8rem" />
        <StyledTextArea
          value={value}
          placeholder="Write here...For example: I Work as a Doctor in Tel Hashomer for 8 Years."
          maxLength={500}
          onChange={(e) =>
            setResumeInput({ ...resumeInput, value: e.target.value })
          }
        ></StyledTextArea>
        <StyledMargin direction="vertical" margin="1rem" />
        <Flex>
          <StyledMargin direction="horizontal" margin="25rem" />
          <StyledSpan fontSize="12px" color="#7F8790" alignSelf="flex-end">
            {500 - characterCount} Character
          </StyledSpan>
        </Flex>
        {isMaxError && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            modalText={modalText}
          />
        )}
        <StyledButton
          // to={"/conversation"}
          disabled={!value}
          onClick={() => {
            dispatch(addDetail(resumeInput));
            setResumeInput({ ...resumeInput, value: "" });
            setIsDetailAdded(true);
          }}
          bg={value ? "#50924E" : "#d7ddd6"}
          hoverBg={value ? "#396d37" : "#d7ddd6"}
          text={"Save & Finish"}
        ></StyledButton>
      </StyledPage>
    </div>
  );
}

export default ResumePage;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { interestsList } from "../../data/interest.js";
import { useDispatch, useSelector } from "react-redux";
import { addDetail } from "../../features/userRegister/userRegisterSlice.jsx";
import { ArrowLeft } from "../../assets/index.jsx";
import Modal from "../../styles/Modal/Modal.jsx";
import {
  StyledPage,
  StyledMargin,
  StyledPageTitle,
  StyledButton,
} from "../../styles/index.jsx";
import {
  Content,
  ButtonDiv,
  Button,
  Header,
  selectedBtn,
  listBtn,
  selectedContainer,
  wrapper,
} from "../../components/index.js";

const Interests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const { interests } = useSelector((state) => state.userRegister.userDetails);
  const [selectedInterests, setSelectedInterests] = useState({
    field: "interests",
    value: interests || [],
    interestsNumber: interests.length > 0 ? interests.length : 0,
  });

  const { value, interestsNumber } = selectedInterests;

  const addInterests = (newInterest) => {
    let prevInterests = value;
    // const newInterestNoEmoji = newInterest.split(" ")[1];
    // no need to remove the emoji
    const isSelected = prevInterests.indexOf(newInterest);
    if (isSelected !== -1) {
      return;
    }
    if (value.length === 5) {
      setIsError(true);
      setModalText("* Maximum number of interests reached.");
      setShowModal(true);
      return;
    }

    const newInterestsArr = [...value, newInterest];
    //to save the interests with emoji to show it in profile page
    setSelectedInterests({
      ...selectedInterests,
      value: newInterestsArr,
      interestsNumber: newInterestsArr.length,
    });
  };

  const removeInterest = (interest) => {
    const newInterestsArr = value.filter(
      (currentInterest) => currentInterest != interest
    );
    setSelectedInterests({
      ...selectedInterests,
      value: newInterestsArr,
      interestsNumber: newInterestsArr.length,
    });
  };

  const handleSave = () => {
    let modalText = "";
    if (interestsNumber < 5) {
      modalText = "* Please select at least 5 interests.";
    }
    if (modalText) {
      setShowModal(true);
      setModalText(modalText);
      return;
    }
    dispatch(addDetail(selectedInterests));
    navigate("/agePage");
  };
  // useEffect(() => {
  //   if (interestsNumber === 5) {
  //     return setDisableSaveBtn(false);
  //   }
  //   return setDisableSaveBtn(true);
  // }, [interestsNumber]);
  useEffect(() => {
    dispatch(addDetail(selectedInterests));
  }, [selectedInterests]);
  return (
    <div style={wrapper}>
      <Header
        leftIcon={
          <Link to="/lang">
            <ArrowLeft />
          </Link>
        }
        title={"Add Interests"}
      />
      <StyledPage>
        <StyledMargin direction="horizontal" margin="35rem">
          <StyledPageTitle style={{ marginTop: "2rem" }}>
            Choose five interests &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp; &nbsp; {interestsNumber} of 5{" "}
          </StyledPageTitle>
        </StyledMargin>
        <Content>
          {isError && (
            // <h1 style={{ color: "red" }}>
            //   * max Interests Number, were selected
            // </h1>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              modalText={modalText}
            />
          )}
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            modalText={modalText}
          />
          <div style={selectedContainer}>
            {value.map((interest) => (
              <button
                style={selectedBtn}
                key={interest}
                onClick={() => removeInterest(interest)}
              >
                {interest}
                <span> X</span>
              </button>
            ))}
          </div>

          <div>
            {interestsList.map((interest) => (
              <span key={interest}>
                <button style={listBtn} onClick={() => addInterests(interest)}>
                  {interest}
                </button>
              </span>
            ))}
          </div>

          <ButtonDiv>
            <Button onClick={handleSave}>Save & Next</Button>
          </ButtonDiv>
        </Content>
      </StyledPage>
    </div>
  );
};

export default Interests;

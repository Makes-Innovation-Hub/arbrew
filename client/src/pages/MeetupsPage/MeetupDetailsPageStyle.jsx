import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RiPriceTag2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {
  MeetupWrapper,
  Title,
  InfoText,
  HeaderText,
  AttendeesHeaderText,
  AttendeesAvatarIcon,
  AttendButton,
  AboutmeText,
  UpdateButton,
  ButtonSectionContainer,
  TitleContainer,
  DeleteButton,
  HeaderTextContainer,
} from "../../styles/MeetupDetailsStyle/MeetupDetailsStyle";
import {
  MyMeetupDescriptionSection,
  MyMeetupH1,
  MyMeetupText,
  StyledRow,
} from "./StyledSpecificMeetup";
import { StyledMargin } from "../../styles";
import { GrUpdate } from "react-icons/gr";
import { PiNotePencilBold } from "react-icons/pi";

const MeetupDetailsDisplay = ({
  title,
  date,
  time,
  location,
  price,
  description,
  isAttending,
  attendees,
  onAttendClick,
  meetupId,
  isOwner,
  handleDeleteMeetup,
  handleMapButtonClick,
}) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUpdateMeetup = async () => {
    navigate(`/MeetupForm?MeetupId=${meetupId}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const handleAttendeesClick = (meetupId) => {
    // Navigate to the attendees page
    navigate(`/Attendeespage/${meetupId}`);
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    handleDeleteMeetup();
    setShowConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
  };

  const handleLocationClick = () => {
    // Log location data
    handleMapButtonClick(location);
  };
  return (
    <MeetupWrapper>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>

      <StyledRow>
        <IoCalendarNumberOutline />
        <MyMeetupText>
          {formatDate(date)}, {time}
        </MyMeetupText>
      </StyledRow>

      <StyledMargin direction="vertical" margin="1.8rem" />

      <StyledRow>
        <CiLocationOn size={18} />
        <MyMeetupText onClick={handleLocationClick}>{location}</MyMeetupText>
      </StyledRow>

      <StyledMargin direction="vertical" margin="1.8rem" />

      <StyledRow>
        <RiPriceTag2Line />
        <MyMeetupText>{price}</MyMeetupText>
      </StyledRow>

      <StyledMargin direction="vertical" margin="4rem" />
      <MyMeetupH1>About</MyMeetupH1>

      <MyMeetupDescriptionSection>
        {description}
        <StyledMargin direction="vertical" margin="1.8rem" />
      </MyMeetupDescriptionSection>

      <StyledMargin direction="vertical" margin="4rem" />
      <AttendeesHeaderText onClick={() => handleAttendeesClick(meetupId)}>
        Attendees
      </AttendeesHeaderText>

      <AttendeesAvatarIcon>
        {attendees.map((attendee) => (
          <Link
            key={attendee.id}
            to={`/profiled?type=hobbies&userId=${attendee.id}`}
          >
            <img key={attendee.id} src={attendee.avatar} alt={attendee.name} />
          </Link>
        ))}
      </AttendeesAvatarIcon>
      <StyledMargin direction="vertical" margin="4rem" />

      <ButtonSectionContainer>
        {!isOwner && (
          <AttendButton isAttending={isAttending} onClick={onAttendClick}>
            {isAttending ? "Cancel Attend" : "Attend"}
          </AttendButton>
        )}
        {isOwner && (
          <>
            {showConfirmation ? (
              <HeaderTextContainer>
                <HeaderText>Are you sure you want to delete?</HeaderText>

                <ButtonSectionContainer>
                  <UpdateButton onClick={handleDeleteCancel}>No</UpdateButton>
                  <DeleteButton onClick={handleDeleteConfirm}>Yes</DeleteButton>
                </ButtonSectionContainer>
              </HeaderTextContainer>
            ) : (
              <>
                <UpdateButton onClick={handleUpdateMeetup}>Edit</UpdateButton>
                <DeleteButton onClick={handleDeleteConfirmation}>
                  Delete
                </DeleteButton>
              </>
            )}
          </>
        )}
      </ButtonSectionContainer>
    </MeetupWrapper>
  );
};

export default MeetupDetailsDisplay;

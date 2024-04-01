import React, { useState } from "react";
import { StyledMargin, UpcomingStyledPage } from "../../styles";
import { Header } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "../../assets";
import {
  Center,
  StyledMyJobPage,
  Title,
} from "../jobs/myPostedJobspage/StyledMyJobPage";
import {
  AttendeesSection,
  MyMeetupDescriptionSection,
  MyMeetupH1,
  MyMeetupImage,
  MyMeetupText,
  MyMeetupTitle,
  StyledMyMeetingContainer,
  StyledRow,
} from "./StyledSpecificMeetup";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { RiPriceTag2Line } from "react-icons/ri";
import {
  useGetMeetupByIdQuery,
  useUpdateMeetupMutation,
} from "../../features/meetupApi";
import MeetupDetailsDisplay from "./MeetupDetailsPageStyle";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function SpecificMeetup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetMeetupByIdQuery(id);
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (isError) {
    return <div>Error fetching meeting details</div>;
  }

  const { title, date, time, location, description, price, attendees } =
    data.data;

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

  const handleBack = () => {
    window.history.back();
  };

  const handleAttendeesClick = (meetupId) => {
    // Navigate to the attendees page
    navigate(`/Attendeespage/${meetupId}`);
  };

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <div onClick={handleBack}>
              <ArrowLeft />
            </div>
          }
          title={"Meetup Page"}
        />
      </StyledMargin>
      <UpcomingStyledPage>
        {data && data.data && (
          <MeetupDetailsDisplay
            key={data.data._id}
            title={title}
            date={date}
            time={time}
            location={location}
            price={price}
            description={description}
            attendees={attendees}
            meetupId={id}
            isOwner={true}
          />
        )}
      </UpcomingStyledPage>
      <StyledMyJobPage>
        <MyMeetupTitle>{title}</MyMeetupTitle>

        <StyledMargin direction="vertical" margin="4rem" />

        <StyledRow>
          <IoCalendarNumberOutline />
          <MyMeetupText>
            {formatDate(date)}, {time}
          </MyMeetupText>
        </StyledRow>

        <StyledMargin direction="vertical" margin="1.8rem" />

        <StyledRow>
          <CiLocationOn size={18} />
          <MyMeetupText>{location}</MyMeetupText>
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
        <MyMeetupH1>Attendees</MyMeetupH1>

        <StyledMargin direction="vertical" margin="1.8rem" />
        {attendees.length > 0 ? (
          <AttendeesSection>
            {attendees.map((attendee, index) => (
              <MyMeetupImage
                key={index}
                src={attendee.avatar}
                alt={attendee.name}
              />
            ))}
          </AttendeesSection>
        ) : (
          <div>No attendees yet</div>
        )}

        <StyledMargin direction="vertical" margin="2rem" />
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Meetup"}
        </button>
      </StyledMyJobPage>
    </div>
  );
}

export default SpecificMeetup;

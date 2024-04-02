import React from "react";
import { Link, useParams } from "react-router-dom";
import { StyledMargin, UpcomingStyledPage, CenteredText } from "../../styles";
import Header from "../../components/Header";
import { ArrowLeft } from "../../assets";
import { useGetMeetupByIdQuery } from "../../features/meetupApi";
import {
  AttendeesPageContainer,
  AttendeesPageName,
  AttendeesPageStyle,
} from "../../styles/MeetupDetailsStyle/MeetupDetailsStyle";
import { StyledApplierImg } from "../jobs/jobAppliers/StylesApplierPage";

const AttendeesPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetMeetupByIdQuery(id);

  const handleBack = () => {
    window.history.back();
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
          title="Attendees page"
        />
      </StyledMargin>
      <UpcomingStyledPage>
        <CenteredText></CenteredText>
        <AttendeesPageContainer>
          {data?.data?.attendees.map((attendee) => (
            <AttendeesPageStyle key={attendee.id}>
              <Link to={`/profiled?type=hobbies&userId=${attendee.id}`}>
                <StyledApplierImg
                  key={attendee.id}
                  src={attendee.avatar}
                  alt={attendee.name}
                />
              </Link>
              <AttendeesPageName>
                {attendee.name.split(" ")[0]}
              </AttendeesPageName>
            </AttendeesPageStyle>
          ))}
        </AttendeesPageContainer>
      </UpcomingStyledPage>
    </div>
  );
};

export default AttendeesPage;

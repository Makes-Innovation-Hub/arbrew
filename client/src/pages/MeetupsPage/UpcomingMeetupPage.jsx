import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import {
  UpcomingStyledPage,
  StyledMargin,
  MeetupListStyle,
  UpcomingDisplay,
  CenteredText,
} from "../../styles";
import { ArrowLeft } from "../../assets";
import { useGetAllMeetupsQuery } from "../../features/meetupApi";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function MyMeetups() {
  const { t } = useTranslation();
  const [isSideBar, setIsSideBar] = useState(false);
  const { data, isError, isLoading } = useGetAllMeetupsQuery();
  const navigation = useNavigate();

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return <div>{t("error_fetching_meetups")}</div>;
  }

  const handleNavigation = (meetupId) => {
    navigation(`/myMeetupPage/${meetupId}`);
  };

  return (
    <div>
      {isSideBar && (
        <div>
          <SideBar openSideBar={setIsSideBar} />
        </div>
      )}
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/meetupsHomePage">
              <ArrowLeft />
            </Link>
          }
          title={t("meetups")}
        />
      </StyledMargin>
      <UpcomingStyledPage>
        <CenteredText>{t("upcoming_meetups")}</CenteredText>

        {Array.isArray(data.data) && data.data.length > 0 ? (
          <MeetupListStyle>
            {data?.data?.map((meetup, i) => (
              <UpcomingDisplay
                meetupId={meetup.id}
                key={meetup.id}
                title={meetup.title}
                date={meetup.date}
                time={meetup.time}
                location={meetup.location}
                attendeesCount={meetup.attendees.length}
                ownerId={meetup.owner}
              />
            ))}
          </MeetupListStyle>
        ) : (
          <CenteredText>
            <div>{t("no_upcoming_meetups")}</div>
          </CenteredText>
        )}
      </UpcomingStyledPage>
    </div>
  );
}

export default MyMeetups;

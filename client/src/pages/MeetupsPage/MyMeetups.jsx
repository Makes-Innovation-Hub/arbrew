import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import {
  UpcomingStyledPage,
  StyledMargin,
  MeetupListStyle,
  UpcomingDisplay,
  CenteredText,
  MainButton,
  StyledPage,
} from "../../styles";
import { SmallGlass, ArrowLeft } from "../../assets";
import {
  useGetAllMeetupsQuery,
  useGetMyMeetupsQuery,
} from "../../features/meetupApi";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function MyMeetups() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSideBar, setIsSideBar] = useState(false);
  const { data, error, isLoading } = useGetMyMeetupsQuery();
  const navigation = useNavigate();

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <UpcomingStyledPage>
          <CenteredText>{t("my_meetups_posts")}</CenteredText>

          {Array.isArray(data?.data) && data?.data.length !== 0 ? (
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
            <StyledPage>
              <CenteredText>{t("no_meetups_posted")}</CenteredText>
              <MainButton onClick={() => navigate("/MeetupForm")}>
                Post A Meetup
              </MainButton>
            </StyledPage>
          )}
        </UpcomingStyledPage>
      )}
    </div>
  );
}

export default MyMeetups;

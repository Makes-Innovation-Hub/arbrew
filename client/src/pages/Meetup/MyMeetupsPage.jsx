import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MeetupFormWrapper,
  Circle,
} from "../../styles/Meetup/MeetupStyledPage.jsx";
import { useGetMeetupByIdQuery } from "../../features/meetupApi.js";
import { StyledMargin, StyledPage } from "../../styles";
import Header from "../../components/Header.jsx";
import ArrowLeft from "../../assets/ArrowLeft.jsx";
import { DividerLine } from "../../styles/Meetup/MeetupStyledPage.jsx";
import { useParams } from "react-router-dom";
import { TimeIcon } from "../../styles/Meetup/MeetupStyledPage.jsx";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const MyMeetupPage = () => {
  const { t } = useTranslation();

  // const { id } = useParams();
  const id = "65daf733ee13aeea9138fd43";
  const { data: meetupById, isLoading, isError } = useGetMeetupByIdQuery(id);
  const [targetMeetup, setTargetMeetup] = useState(null);
  const [randomAvatars, setRandomAvatars] = useState([]);

  useEffect(() => {
    if (meetupById && meetupById.data) {
      const targetMeetup = meetupById.data;
      if (targetMeetup) {
        setTargetMeetup(targetMeetup);
        const avatars = Array.from(
          { length: 7 },
          (_, index) =>
            `https://randomuser.me/api/portraits/${
              Math.random() > 0.5 ? "men" : "women"
            }/${index + 1}.jpg`
        );
        setRandomAvatars(avatars);
      } else {
        console.log("No meetup with the specified id found.");
      }
    }
  }, [meetupById]);

  if (isError) console.log("error_fetching_meetups");
  if (!targetMeetup) return <div>{t("no_meetup_found")}</div>;

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/MeetupsHomePage">
              <ArrowLeft />
            </Link>
          }
          title={t("meetup_page_title")}
        />
      </StyledMargin>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledPage>
          <MeetupFormWrapper>
            <form>
              <div>
                <h1>{targetMeetup.title}</h1>
              </div>
              <br />
              <br />
              <div>
                <p>{targetMeetup.date}</p>
              </div>
              <DividerLine />
              <div>
                <a
                  href={`https://maps.google.com/?q=${targetMeetup.location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {targetMeetup.location}
                </a>
              </div>
              <DividerLine></DividerLine>
              <div>
                <p>{targetMeetup.price}</p>
              </div>
              <DividerLine></DividerLine>
              <div>
                <h3>{t("about")}</h3>
                {targetMeetup.description}
              </div>
              <DividerLine></DividerLine>
              <div>
                <h3>{t("attendees")}</h3>
                {randomAvatars.map((avatar, index) => (
                  <Circle key={index}>
                    <img src={avatar} alt={`Avatar ${index + 1}`} />
                  </Circle>
                ))}
              </div>
            </form>
          </MeetupFormWrapper>
        </StyledPage>
      )}
    </div>
  );
};

export default MyMeetupPage;

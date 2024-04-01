import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { ArrowLeft } from "../../assets";
import { UpcomingStyledPage, StyledMargin } from "../../styles";
import MeetupDetailsDisplay from "./MeetupDetailsPageStyle.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetMeetupByIdQuery,
  useAttendMeetupMutation,
  useDeleteMeetupMutation,
} from "../../features/meetupApi";
import { OtherPageButton } from "../jobs/myPostedJobspage/StyledMyJobPage.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const MeetupDetailsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { meetupId } = useParams();
  const { data, error, isLoading, isError } = useGetMeetupByIdQuery(meetupId, {
    skip: !meetupId,
  });
  const storedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const [isAttending, setIsAttending] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [attendMeetup] = useAttendMeetupMutation();
  const [deleteMeetup] = useDeleteMeetupMutation();

  useEffect(() => {
    setIsAttending(
      data?.data?.attendees.some((user) => user.id === storedUser?.id)
    );
    setIsOwner(data?.data?.owner?.id === storedUser?.id);
  }, [data, meetupId, storedUser, setIsAttending]);

  const handleAttendButtonClick = async () => {
    // Toggle attendance status
    try {
      await attendMeetup({ meetupId, isAttending: !isAttending });
      setIsAttending(!isAttending);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
    ``;
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteMeetup({ meetupId });
      navigate("/My-meetups-page");
    } catch (error) {
      console.error("Error deleting meetup:", error);
    }
  };

  if (isError) {
    console.error("error fetching meetup details", error);
  }
  const handleMapButtonClick = async () => {
    try {
      const location = data?.data?.location;
      console.log("Location clicked:", location);

      if (!location) {
        console.error("Location data not found");
        return;
      }

      const searchText = encodeURIComponent(location);
      const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${
        import.meta.env.VITE_LOCATION_TOKEN
      }&q=${searchText}&format=json`;

      const response = await fetch(apiUrl);
      const responseData = await response.json();

      if (responseData.length > 0) {
        const { lat, lon } = responseData[0];
        console.log("Latitude:", lat);
        console.log("Longitude:", lon);

        const queryParams = new URLSearchParams({ location: `${lat},${lon}` });
        const url = `/Map?${queryParams.toString()}`;

        navigate(url);
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/UpcomingMeetupPage">
              <ArrowLeft />
            </Link>
          }
          title={t("meetup_page")}
        />
      </StyledMargin>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <UpcomingStyledPage>
          {data && data.data && (
            <MeetupDetailsDisplay
              key={data.data._id}
              title={data.data.title}
              date={data.data.date}
              time={data.data.time}
              location={data.data.location}
              price={data.data.price}
              description={data.data.description}
              isAttending={isAttending}
              attendees={data.data.attendees}
              onAttendClick={handleAttendButtonClick}
              meetupId={meetupId}
              isOwner={isOwner}
              handleDeleteMeetup={handleDeleteButtonClick}
              handleMapButtonClick={handleMapButtonClick}
            />
          )}
        </UpcomingStyledPage>
      )}
    </div>
  );
};

export default MeetupDetailsPage;

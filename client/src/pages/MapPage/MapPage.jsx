import React from "react";
import { StyledMargin, UpcomingStyledPage } from "../../styles";
import { Header } from "../../components";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "../../assets";
import MapComponent from "./MapComponent";

const extractLatLon = (location) => {
  if (!location || typeof location !== "string") {
    console.error("Invalid location data:", location);
    return { lat: 0, lon: 0 };
  }

  // Remove percent encoding from the location string
  const decodedLocation = decodeURIComponent(location);

  // Split the decoded location string by comma
  const [lat, lon] = decodedLocation.split(",");

  return { lat: parseFloat(lat), lon: parseFloat(lon) };
};

const MapPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const location = queryParams.get("location");

  const { lat, lon } = extractLatLon(location);

  const coordinatesString = `${lat},${lon}`;
  console.log("Coordinates:", coordinatesString);

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/UpcomingMeetupPage">
              <ArrowLeft />
            </Link>
          }
          title={"Map"}
        />
      </StyledMargin>
      <UpcomingStyledPage>
        <MapComponent lat={lat} lon={lon} />
      </UpcomingStyledPage>
    </div>
  );
};

export default MapPage;

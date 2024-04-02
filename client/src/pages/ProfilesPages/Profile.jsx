import React from "react";
import { StyledMargin, StyledPage } from "../../styles";
import ProfileDetailsComponent from "./ProfileDetailsComponent";
import ProfileFieldsComponent from "./ProfileFieldsComponent";
import { useLocation } from "react-router-dom";
// import ProfileDetailsComponent from './ProfileDetailsComponent'

function Profile() {
  const { search } = useLocation();
  if (!search || typeof search !== "string") {
    return null;
  }

  //?type=work&userId=65d5c5e951762c9fa64579ba
  // const params = URLSearchParams(search);
  const type = search.split("?")[1].split("=")[1].split("&")[0];
  const userId = search.split("&")[1].split("=")[1];
  return (
    <div>
      <ProfileDetailsComponent userId={userId} />
      <StyledMargin direction="vertical" margin="1.7rem" />
      <ProfileFieldsComponent profileType={type} userId={userId} />
    </div>
  );
}

export default Profile;

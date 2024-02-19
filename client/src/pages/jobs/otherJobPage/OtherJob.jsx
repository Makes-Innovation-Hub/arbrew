import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { ArrowLeft } from "../../../assets";
import {
  DisplayMe,
  Flex,
  ProfileChat,
  StyledInput,
  StyledMargin,
  StyledPage,
  StyledPageTitle,
  StyledSpan,
} from "../../../styles";
import { UserContext } from "../../../contexts/loggedUser.context";

function OtherJob() {
  const { userData: loggedUser } = useContext(UserContext);
  return (
    <div>
      <Header
        leftIcon={
          <Link to="/">
            <ArrowLeft />
          </Link>
        }
        title={"Job Page"}
      />
      <StyledPage height="1000px">
        <StyledMargin direction="vertical" margin="1.75rem" />
        <Flex>
          <StyledMargin direction="horizontal" margin="25rem" />
          <DisplayMe>
            <ProfileChat profile={loggedUser.avatar} /> {loggedUser.name}
          </DisplayMe>
        </Flex>
      </StyledPage>
    </div>
  );
}

export default OtherJob;

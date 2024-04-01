import { useContext, useEffect } from "react";
import { useLazyGetUsersQuery } from "../../features/userDataApi.js";
import { FriendsList } from "../../components/index.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../components/index.js";
import {
  StyledPage,
  StyledMargin,
  StyledPageTitle,
  StyledHobby,
  StyledHobbiesContainer,
} from "../../styles/index.jsx";
import { ArrowLeft, SmallGlass } from "../../assets/index.jsx";
import { useSelector } from "react-redux";
import { UserContext } from "../../contexts/loggedUser.context.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
const SearchFriends = () => {
  const { userData: contextUser } = useContext(UserContext);
  const loggedUser = useSelector((state) => state.userRegister);
  const originLang =
    loggedUser.userDetails.nativeLanguage ||
    contextUser.userDetails.nativeLanguage;
  const [selectedInterests, setSelectedInterests] = useState(
    loggedUser.userDetails.interests
  );
  const [getUsers, { data = [], error, isError, isLoading, isSuccess }] =
    useLazyGetUsersQuery();

  useEffect(() => {
    getUsers({
      subId: loggedUser.subId,
      interests: selectedInterests,
    });
  }, [selectedInterests]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Header
        leftIcon={
          <Link to="/conversation?hub=hobbies">
            <ArrowLeft />
          </Link>
        }
        midIcon={<SmallGlass />}
      />
      <StyledPage>
        <StyledMargin direction="vertical" margin="1.75rem" />
        <StyledPageTitle>Search friends</StyledPageTitle>
        <StyledMargin direction="vertical" margin="0.75rem" />
        <StyledPageTitle>by common Interests</StyledPageTitle>
        <StyledMargin direction="vertical" margin="2rem" />
        <StyledHobbiesContainer>
          {loggedUser.userDetails.interests.map((interest) => (
            <StyledHobby
              border={
                selectedInterests.includes(interest)
                  ? "solid 1px #50924E"
                  : null
              }
              key={interest}
              onClick={() => {
                if (!selectedInterests.includes(interest)) {
                  setSelectedInterests([...selectedInterests, interest]);
                } else {
                  setSelectedInterests(
                    selectedInterests.filter((item) => item !== interest)
                  );
                }
              }}
            >
              {interest}
            </StyledHobby>
          ))}
        </StyledHobbiesContainer>
        <StyledMargin direction="vertical" margin="4rem" />
        {isSuccess && (
          <FriendsList
            friendsArr={data}
            originLang={originLang}
            loggedUser={loggedUser}
          />
        )}
      </StyledPage>
    </>
  );
};

export default SearchFriends;

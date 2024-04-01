import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FlagContainer, FlagImg, StyledMargin } from "../../styles";
import { Header } from "../../components";
import { ArrowLeft, SmallGlass } from "../../assets";
import {
  Center,
  StyledAppliersTitle,
  StyledMyJobPage,
  StyledName,
} from "../jobs/myPostedJobspage/StyledMyJobPage";
import {
  Container,
  FirstRow,
  SecondRow,
  StyledApplierImg,
  StyledIconDiv,
  StyledIconImg,
} from "../jobs/jobAppliers/StylesApplierPage";
import flags from "../../assets/countriesAndFlags/by-code.json";
import { useGetWorkUsersQuery } from "../../features/userDataApi";
import { Occupation, StyledOccupationText } from "./StyledSearchColleagues";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function SearchColleaguesPage() {
  const loggedUser = useSelector((state) => state.userRegister);
  const { data, isLoading, isError, isSuccess, error } = useGetWorkUsersQuery();
  const navigate = useNavigate();
  if (isError) {
    console.log("Error fetching users details", error);
  }
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
          title={<SmallGlass />}
        />
      </StyledMargin>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledMyJobPage height="710px">
          <Center>
            <StyledAppliersTitle>Search Colleagues</StyledAppliersTitle>
          </Center>
          <StyledMargin direction="vertical" margin="2rem" />
          {isSuccess && (
            <>
              {data?.data.map((colleague) => (
                <Container key={colleague._id}>
                  <FirstRow>
                    <Link to={`/profiled?type=work&userId=${colleague._id}`}>
                      {colleague && colleague.avatar ? (
                        <StyledApplierImg src={colleague.avatar} alt="pic" />
                      ) : (
                        <div>No Avatar</div>
                      )}
                    </Link>
                    <FlagContainer>
                      <FlagImg
                        src={flags[colleague?.userDetails?.nationality]?.image}
                      />
                    </FlagContainer>
                    <StyledName>{colleague?.name?.split(" ")[0]}</StyledName>
                  </FirstRow>
                  <SecondRow>
                    <Occupation>
                      <StyledOccupationText>
                        {colleague?.userDetails?.occupation}
                      </StyledOccupationText>
                    </Occupation>
                  </SecondRow>
                  <StyledIconDiv>
                    <Link
                      to={`/chat-page/?sender=${loggedUser.id}&hub=work&receiver=${colleague?._id}`}
                      state={{
                        receiverImg: colleague?.avatar,
                        receiverName: colleague?.name,
                      }}
                    >
                      <StyledIconImg src="/messageBox.png" />
                    </Link>
                  </StyledIconDiv>
                </Container>
              ))}
            </>
          )}
        </StyledMyJobPage>
      )}
    </div>
  );
}

export default SearchColleaguesPage;

//component that not used
import React from "react";
import { StyledMargin, StyledPage, StyledTitle } from "../../../styles";
import { Header } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "../../../assets";
import {
  StyledMyJobPage,
  Title,
  StyledJobText,
  ContentWrapper,
  Center,
  FirstSection,
  StyledImg,
  StyledName,
  StyledUnderName,
  ProfileSection,
  SecondSection,
  DescriptionSection,
  AppliedSection,
} from "./StyledMyJobPage";
import {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useDeleteJobMutation,
} from "../../../features/jobStore/jobAPI";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function MyPostedJob() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: job,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetJobByIdQuery(id);
  const [deleteJob] = useDeleteJobMutation();
  if (isError) {
    console.log("error_fetching_job_details", error);
  }

  const handleAppliers = () => {
    navigate(`/appliers/${job?.job.id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteJob(id);
      if (response.error) {
        console.error("Error deleting job:", response.error);
        console.error("Error data:", response.error.data);
        console.error("Original status:", response.error.originalStatus);
        return;
      }
      navigate("/myJobsPosted");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/myJobsPosted">
              <ArrowLeft />
            </Link>
          }
          title={t("my_posted_job_page")}
        />
      </StyledMargin>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledMyJobPage>
          <Center>
            <Title>{job?.job.title}</Title>
          </Center>
          <StyledMargin direction="vertical" margin="1.8rem" />

          <FirstSection>
            <StyledJobText>{job?.job.company}</StyledJobText>
            <StyledJobText>{job?.job.city}</StyledJobText>
            <StyledJobText>({job?.job.model})</StyledJobText>
            <StyledMargin direction="vertical" margin="1.8rem" />
          </FirstSection>
          <StyledMargin direction="vertical" margin="1.8rem" />

          <SecondSection>
            <StyledImg src={job?.job.postedBy.avatar} alt="Description" />
            <ProfileSection>
              <StyledName>{job?.job.postedBy.name}</StyledName>
              <StyledUnderName>
                {job?.job.postedBy.userDetails.occupation}
              </StyledUnderName>
            </ProfileSection>
          </SecondSection>
          <DescriptionSection>
            {job?.job.description}
            <StyledMargin direction="vertical" margin="1.8rem" />
          </DescriptionSection>
          <StyledMargin direction="vertical" margin="1.8rem" />

          <AppliedSection onClick={handleAppliers}>
            {job?.job.applicants.length} {t("applied")}
          </AppliedSection>

          <button onClick={handleDelete}>Delete</button>
        </StyledMyJobPage>
      )}
    </div>
  );
}

export default MyPostedJob;

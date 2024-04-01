import React from "react";
import { StyledMargin } from "../../../styles";
import { Header } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, SmallGlass } from "../../../assets";
import {
  Center,
  StyledJobText,
  StyledMyJobPage,
} from "../myPostedJobspage/StyledMyJobPage";
import {
  ContainerSection,
  StyledMyPostJobTitle,
  StyledText,
} from "./StyledMyJobPosts";
import {
  useGetAllJobsQuery,
  useGetUserJobPostsQuery,
} from "../../../features/jobStore/jobAPI";
import MyJobPostsComponent from "./MyJobPostsComponent";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function MyJobPosts() {
  const { t } = useTranslation();
  const storedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  if (!storedUser) {
    return <div>{t("user_not_found")}</div>;
  }

  const { data, isLoading, isError, isSuccess } = useGetUserJobPostsQuery();

  if (!data) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (isError) {
    return <div>{t("error_fetching_job_details")}</div>;
  }

  const handleClick = (jobId) => {
    navigate(`/otherJob/${jobId}`);
  };

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/work">
              <ArrowLeft />
            </Link>
          }
          title={<SmallGlass />}
        />
      </StyledMargin>
      <StyledMyJobPage>
        <Center>
          <StyledMyPostJobTitle>{t("my_job_posts")}</StyledMyPostJobTitle>
        </Center>
        <StyledMargin direction="vertical" margin="1.8rem" />
        {data.jobPosts.map((job) => (
          <MyJobPostsComponent
            key={job.id}
            jobTitle={job.title}
            company={job.company}
            city={job.city}
            model={job.model}
            onClick={() => handleClick(job.id)}
          />
        ))}
      </StyledMyJobPage>
    </div>
  );
}

export default MyJobPosts;

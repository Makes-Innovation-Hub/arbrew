import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllJobsQuery } from "../../features/jobStore/jobAPI";
import Header from "../../components/Header";
import { StyledMargin, StyledPage } from "../../styles";
import { ArrowLeft } from "../../assets";
import { JobList, JobItem } from "./StyledJobBoard";
import { useTranslation } from "react-i18next";
import { Center } from "../jobs/myPostedJobspage/StyledMyJobPage";
import { Title } from "../../styles/UpcomingStyledPage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function JobBoardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSideBar, setIsSideBar] = useState(false);
  const [jobs, setJobs] = useState([]);

  const { data, isLoading, isError, isSuccess } = useGetAllJobsQuery();

  useEffect(() => {
    setJobs(data?.data);
  }, [data]);

  if (isError) return <div>{t("error_fetching_jobs")}</div>;
  const goToJobDetails = (jobId) => {
    navigate(`/otherjob/${jobId}`);
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
          title={t("job_board")}
        />
      </StyledMargin>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledPage>
          <h1>{t("open_jobs")}</h1>
          {jobs?.length === 0 ? (
            <Center>
              <Title>No open job at the moment.</Title>
            </Center>
          ) : (
            <JobList>
              {jobs?.map((job) => (
                <JobItem key={job._id} onClick={() => goToJobDetails(job._id)}>
                  <h2>{job.title}</h2>
                  <p>{job.company}</p>
                  <p>{job.city}</p>
                  <p>({job.model})</p>
                </JobItem>
              ))}
            </JobList>
          )}
        </StyledPage>
      )}
    </div>
  );
}

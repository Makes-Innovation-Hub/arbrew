import React from "react";
import { StyledButton, StyledMargin } from "../../../styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "../../../assets";
import {
  AppliedSection,
  Center,
  DSection,
  DeleteButton,
  DeleteTitle,
  DescriptionSection,
  EDSection,
  EditButton,
  FirstSection,
  OtherPageButton,
  ProfileSection,
  SecondSection,
  SendButton,
  StyledImg,
  StyledJobText,
  StyledMyJobPage,
  StyledName,
  StyledUnderName,
  Title,
  UpdateSection,
} from "../myPostedJobspage/StyledMyJobPage";
import { Header } from "../../../components";
import {
  useApplyToJobMutation,
  useGetJobByIdQuery,
  useDeleteJobMutation,
} from "../../../features/jobStore/jobAPI";
import { useTranslation } from "react-i18next";
import { PiNotePencilBold } from "react-icons/pi";
import { TitleContainer } from "../../../styles/MeetupDetailsStyle/MeetupDetailsStyle";
import DropboxChooser from "react-dropbox-chooser";
import { useUpdateUserMutation } from "../../../features/userDataApi";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import.meta.env.VITE_SERVER_BASE_URL;
const APP_KEY = import.meta.env.VITE_DROPBOX_APP_KEY;
function OtherJob() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: job, isLoading, isError, isSuccess } = useGetJobByIdQuery(id);
  const [deleteJob] = useDeleteJobMutation();
  const storedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const [applyToJob] = useApplyToJobMutation();
  const [isOwner, setIsOwner] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [updateUser] = useUpdateUserMutation();

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    setIsOwner(job?.job?.postedBy?.id === storedUser?.id);
  }, [job, id, storedUser]);

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
  const handleApplyButton = async (file) => {
    try {
      const { data } = await applyToJob({
        userId: storedUser.id,
        resume: storedUser.userDetails.resume,
        jobId: job.job.id,
      });

      if (file && file.length > 0) {
        const updateData = {
          resumeFile: file[0].link,
        };

        const response = await updateUser({
          id: storedUser.id,
          userData: updateData,
        });
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.log("error applying to job", error);
    }
  };

  if (isError) {
    return <div>{t("error_fetching_job_details")}</div>;
  }
  const handleAppliers = () => {
    navigate(`/appliers/${job?.job.id}`);
  };
  const handleUpdateJob = async () => {
    navigate(`/postJob?JobId=${id}`);
  };

  return (
    <div>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <Link to="/job-board">
              <ArrowLeft />
            </Link>
          }
          title={isOwner ? t("my_posted_job_page") : "Job Page"}
        />
      </StyledMargin>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StyledMyJobPage>
          <Center>
            <Title>{job?.job?.title}</Title>
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
            <StyledImg src={job?.job?.postedBy?.avatar} alt="Description" />
            <ProfileSection>
              <StyledName>{job?.job?.postedBy?.name}</StyledName>
              <StyledUnderName>
                {job?.job?.postedBy?.userDetails?.occupation}
              </StyledUnderName>
            </ProfileSection>
          </SecondSection>
          <DescriptionSection>
            {job?.job?.description}
            <StyledMargin direction="vertical" margin="1.8rem" />
          </DescriptionSection>
          <StyledMargin direction="vertical" margin="1.8rem" />

          {isOwner ? (
            <AppliedSection onClick={handleAppliers}>
              {job?.job.applicants.length} {t("applied")}
            </AppliedSection>
          ) : (
            <AppliedSection>
              {job?.job.applicants.length} {t("applied")}
            </AppliedSection>
          )}

          <StyledMargin direction="vertical" margin="35rem" />

          {isOwner ? (
            showConfirmation ? (
              <DSection>
                <DeleteTitle>Are you sure you want to delete?</DeleteTitle>
                <EDSection>
                  <EditButton onClick={handleCancelDelete}>No</EditButton>
                  <DeleteButton onClick={handleDelete}>Yes</DeleteButton>
                </EDSection>
              </DSection>
            ) : (
              <EDSection>
                <EditButton onClick={handleUpdateJob}>Edit</EditButton>
                <DeleteButton onClick={handleDeleteConfirmation}>
                  {t("delete_job_button")}
                </DeleteButton>
              </EDSection>
            )
          ) : (
            <DropboxChooser
              appKey={APP_KEY}
              success={handleApplyButton}
              cancel={() => console.log("closed")}
              multiselect={true}
              extensions={[".pdf", ".docx"]}
              disabled={job?.job?.applicants.some(
                (applicant) => applicant.user.subId === storedUser.subId
              )}
            >
              <OtherPageButton>
                {job?.job?.applicants.some(
                  (applicant) => applicant.user.subId === storedUser.subId
                )
                  ? "Resume Sent"
                  : t("send_resume")}
              </OtherPageButton>
            </DropboxChooser>
          )}
        </StyledMyJobPage>
      )}
    </div>
  );
}

export default OtherJob;

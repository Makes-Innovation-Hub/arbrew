import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components";
import {
  StyledPage,
  StyledMargin,
  StyledButton,
  StyledPageTitle,
  StyledInput,
  StyledSpan,
  Flex,
  MainButton,
} from "../../styles";
import { ArrowLeft } from "../../assets";
import { addDetail } from "../../features/userRegister/userRegisterSlice";
import StyledWorkModelDropDown from "./StyledWorkModelDropDown";
import Modal from "../../styles/Modal/Modal";
import { StyledTextArea } from "../../styles/BioPage/StyledTextArea";
import {
  useCreateJobMutation,
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../features/jobStore/jobAPI";
import { addJobDetail } from "../../features/jobStore/JobSlice";
import { useTranslation } from "react-i18next";
import {
  MeetupButton,
  MeetupTextArea,
} from "../../styles/Meetup/MeetupStyledPage";
import { JopPostButton } from "./myPostedJobspage/StyledMyJobPage";
import AutocompleteDropdown from "../Meetup/AutocompleteDropdown/AutocompleteDropdown";

function PostJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const JobId = search.split("=")[1];
  const [isMaxError, setIsMaxError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isDetailAdded, setIsDetailAdded] = useState(false);
  const { t, i18n } = useTranslation();
  const [isJobId, setIsJobId] = useState(false);
  const [createJob, { isSuccess, isError, error }] = useCreateJobMutation();
  const { data, isSuccess2 } = useGetJobByIdQuery(JobId, { skip: !JobId });
  const [updateJob] = useUpdateJobMutation();
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const timeoutRef = useRef(null);

  const [jobTitleInput, setJobTitleInput] = useState({
    field: "jobTitle",
    value: "",
  });

  const [companyNameInput, setCompanyNameInput] = useState({
    field: "companyName",
    value: "",
  });

  const [cityInput, setCityInput] = useState({
    field: "city",
    value: "",
  });

  const [workModelInput, setWorkModelInput] = useState({
    field: "workModel",
    value: "",
  });

  const [workDescriptionInput, setWorkDescriptionInputInput] = useState({
    field: "workDescription",
    value: "",
  });

  const { value: jobTitleInputValue } = jobTitleInput;
  const { value: companyNameValue } = companyNameInput;
  const { value: cityValue } = cityInput;
  const { value: workModelValue } = workModelInput;
  const { value: workDescriptionValue } = workDescriptionInput;

  const workDescriptionCharacterCount = workDescriptionValue.length;
  const jobTitleCharacterCount = jobTitleInputValue.length;
  const companyNameCharacterCount = companyNameValue.length;
  const storedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  const workModelOptions = [
    { label: "On-site", value: "On-site" },
    { label: "Hybrid", value: "Hybrid" },
    { label: "From Home", value: "From Home" },
  ];

  const handleLocationChange = useCallback(async (e) => {
    const currentValue = e.target.value;
    if (!currentValue.trim()) {
      setCityInput({ ...cityInput, value: "" });
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const apiKey = import.meta.env.VITE_ADDRESS_TOKEN;
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          currentValue.trim()
        )}&limit=5&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setSuggestions(data.features);
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    }, 300);
    setCityInput({ ...cityInput, value: currentValue });
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setCityInput({ ...cityInput, value: suggestion.properties.formatted });
    setSuggestions([]);
  };

  useEffect(() => {
    if (workDescriptionValue.length === 500) {
      setIsMaxError(true);
      setShowModal(true);
      setModalText(t("modal_max_character_error"));
    }
  }, [workDescriptionCharacterCount]);

  useEffect(() => {
    if (jobTitleInputValue.length === 30 || companyNameValue.length === 30) {
      setIsMaxError(true);
      setShowModal(true);
      setModalText(t("modal_max_character_error_title_company"));
    }
  }, [jobTitleCharacterCount, companyNameCharacterCount]);

  useEffect(() => {
    setIsJobId(!!JobId);
    if (data) {
      const { title, company, city, description, model } = data.job;
      setJobTitleInput({ ...jobTitleInput, value: title });
      setCompanyNameInput({ ...companyNameInput, value: company });
      setWorkModelInput(model);
      setCityInput({ ...cityInput, value: city });
      setWorkDescriptionInputInput({
        ...workDescriptionInput,
        value: description,
      });
    }
  }, [JobId, data]);

  const handlePost = async () => {
    if (
      !jobTitleInputValue ||
      !companyNameValue ||
      !cityValue ||
      !workModelValue ||
      !workDescriptionValue
    ) {
      setIsMaxError(true);
      setShowModal(true);
      setModalText("Please fill out all fields");
      return;
    }
    const jobDetails = {
      title: jobTitleInput.value,
      company: companyNameInput.value,
      city: cityInput.value,
      model: workModelInput.value,
      description: workDescriptionInput.value,
      postedBy: storedUser.id,
    };
    try {
      const result = await createJob(jobDetails).unwrap();
      navigate(`/otherJob/${result.newJob.id}`);
    } catch (error) {
      console.log("error creating job", error);
    }
  };

  const getTextDirection = () => {
    const lang = i18n.language;
    return lang === "he" || lang === "ar" ? "rtl" : "ltr";
  };
  const handleUpdateJob = async (e) => {
    try {
      const updatedData = {
        title: jobTitleInput.value,
        company: companyNameInput.value,
        city: cityInput.value,
        model: workModelInput.value,
        description: workDescriptionInput.value,
      };
      const response = await updateJob({
        jobId: JobId,
        jobUpdates: updatedData,
      });
      navigate(`/otherJob/${JobId}`);
    } catch (error) {
      console.error("Error updating Job:", error);
    }
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div dir={getTextDirection()}>
      <Header
        leftIcon={
          <div onClick={handleBack}>
            <ArrowLeft />
          </div>
        }
        title={t("post_job")}
      />
      <StyledPage style={{ width: "100%", margin: "auto", gap: "16px" }}>
        <StyledPageTitle>{t("add_job_title")}</StyledPageTitle>

        <StyledInput
          type="text"
          value={jobTitleInputValue}
          maxLength={30}
          onChange={(e) =>
            setJobTitleInput({ ...jobTitleInput, value: e.target.value })
          }
          placeholder={t("write_here_job_title")}
        />
        <Flex>
          <StyledSpan fontSize="12px" color="#7F8790" alignSelf="flex-end">
            {30 - jobTitleCharacterCount} {t("character")}
          </StyledSpan>
        </Flex>

        {/* Company Info */}
        {/* <StyledMargin direction="horizontal" margin="35rem"> */}
        <StyledPageTitle>{t("add_company_name")}</StyledPageTitle>
        {/* </StyledMargin> */}
        <StyledInput
          type="text"
          value={companyNameValue}
          maxLength={30}
          onChange={(e) =>
            setCompanyNameInput({ ...companyNameInput, value: e.target.value })
          }
          placeholder={t("write_here_company_name")}
        />

        <Flex>
          <StyledSpan fontSize="12px" color="#7F8790" alignSelf="flex-end">
            {30 - companyNameCharacterCount} {t("character")}
          </StyledSpan>
        </Flex>
        {/* add city */}

        <StyledPageTitle>{t("add_city")}</StyledPageTitle>
        <div style={{ width: "100%" }}>
          <StyledInput
            style={{ margin: "auto" }}
            type="text"
            value={cityInput.value}
            maxLength={30}
            onChange={handleLocationChange}
            placeholder={t("write_here_city")}
          />
          {suggestions?.length > 0 && (
            <AutocompleteDropdown
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
        {/* work model */}

        <StyledPageTitle>{t("work_model")}</StyledPageTitle>

        <StyledWorkModelDropDown
          optionsArray={workModelOptions}
          placeHolder={t("select")}
          selected={workModelInput}
          setSelected={setWorkModelInput}
          isSearchable={false}
        />

        {/* Add Job Description*/}

        <StyledPageTitle>{t("add_job_description")}</StyledPageTitle>

        <MeetupTextArea
          style={{ width: "80%" }}
          value={workDescriptionValue}
          placeholder={t("write_here_job_description")}
          maxLength={500}
          onChange={(e) =>
            setWorkDescriptionInputInput({
              ...workDescriptionInput,
              value: e.target.value,
            })
          }
        ></MeetupTextArea>

        <Flex>
          <StyledSpan fontSize="12px" color="#7F8790" alignSelf="flex-end">
            {500 - workDescriptionCharacterCount} {t("character")}
          </StyledSpan>
        </Flex>

        {isMaxError && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            modalText={modalText}
          />
        )}
        <StyledMargin direction="vertical" margin="3rem" />
        {isJobId ? (
          <MainButton onClick={handleUpdateJob} text={t("post_job")}>
            Update
          </MainButton>
        ) : (
          <MainButton onClick={handlePost} text={t("post_job")}>
            Post Job
          </MainButton>
        )}
      </StyledPage>
    </div>
  );
}

export default PostJob;

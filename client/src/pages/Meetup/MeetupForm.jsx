import React, { useState, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  useCreateMeetupMutation,
  useGetMeetupByIdQuery,
  useUpdateMeetupMutation,
} from "../../features/meetupApi";
import AutocompleteDropdown from "./AutocompleteDropdown/AutocompleteDropdown"; // AutocompleteDropdown component
import { StyledMargin, StyledPage } from "../../styles";

import {
  MeetupFormWrapper,
  MeetupInput,
  MeetupTextArea,
  MeetupButton,
  UpdateButton,
} from "../../styles/Meetup/MeetupStyledPage";
import { ArrowLeft, ChatIcon } from "../../assets";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const MeetupForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const meetupId = search.split("=")[1];
  const myUser = JSON.parse(sessionStorage.getItem("loggedUser"));
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, settime] = useState("");
  const [price, setprice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [remainingChars, setRemainingChars] = useState(30);
  const [isMeetingId, setIsMeetingId] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // State to manage autocomplete suggestions
  const timeoutRef = useRef(null);

  const [createMeetup, { isLoading, isError }] = useCreateMeetupMutation();
  const [updateMeetupMutation] = useUpdateMeetupMutation();
  const { data, isSuccess } = useGetMeetupByIdQuery(meetupId);
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  useEffect(() => {
    setIsMeetingId(!!meetupId);
    if (isSuccess && data) {
      const { title, date, time, price, location, description } = data.data;
      setTitle(title);
      settime(time);
      setprice(price);
      setLocation(location);
      setDescription(description);
      setDate(formatDate(date));
    }
  }, [meetupId, isSuccess, data]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const meetupData = {
      title,
      date,
      time,
      price,
      description,
      location,
      owner: myUser.id,
    };
    console.log("Meetup Data: ffffffff", meetupData);
    try {
      const response = await createMeetup(meetupData).unwrap();
      console.log("Meetup created successfully:", response);
      navigate("/My-meetups-page");
    } catch (error) {
      console.error("Error creating meetup:", error);
      console.error("Error response:", error.response);
    }
  };

  const handleUpdateMeetup = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title,
        date,
        time,
        price,
        description,
        location,
      };
      const response = await updateMeetupMutation({
        meetupId: meetupId,
        meetupData: updatedData,
      });
      console.log("Meetup updated successfully:", response.data);
      navigate(`/MeetupDetailsPage/${meetupId}`);
    } catch (error) {
      console.error("Error updating meetup:", error);
    }
  };
  const handleTitleChange = (e) => {
    const inputText = e.target.value;
    setTitle(inputText);
    setRemainingChars(30 - inputText.length);
  };
  const handleLocationChange = useCallback(async (e) => {
    const currentValue = e.target.value;
    if (!currentValue.trim()) {
      setLocation("");
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
    setLocation(currentValue);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.properties.formatted);
    setSuggestions([]);
  };

  // Set text direction to left-to-right for Hebrew or Arabic
  const getTextDirection = useCallback(() => {
    const lang = i18n.language;
    return lang === "he" || lang === "ar" ? "rtl" : "ltr";
  }, [localStorage.getItem("lang")]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div dir={getTextDirection()}>
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <div onClick={handleBack}>
              <ArrowLeft />
            </div>
          }
          title={t("post_meetup")}
          rightIcon={
            <Link to="/">
              <ChatIcon />
            </Link>
          }
        />
      </StyledMargin>
      <StyledPage>
        <MeetupFormWrapper>
          <form onSubmit={handleFormSubmit}>
            <div>
              <h3>{t("add_title")}</h3>
              <MeetupInput
                type="text"
                placeholder={t("write_here")}
                value={title}
                onChange={handleTitleChange}
                maxLength={30}
                required
              />
              <p style={{ marginRight: "auto", color: "#666" }}>
                {remainingChars} {t("character")}
              </p>
            </div>
            <div>
              <h3>{t("add_date")}</h3>
              <MeetupInput
                type="date"
                placeholder="WED,  JAN 22"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <h3>{t("add_hour")}</h3>
              <MeetupInput
                type="time"
                placeholder="09:00 PM GMT+2"
                value={time}
                onChange={(e) => settime(e.target.value)}
                required
              />
            </div>
            <div>
              <h3>{t("location")}</h3>
              <MeetupInput
                type="text"
                placeholder={t("location")}
                value={location}
                onChange={handleLocationChange}
              />
              {suggestions.length > 0 && (
                <AutocompleteDropdown
                  suggestions={suggestions}
                  handleSuggestionClick={handleSuggestionClick}
                />
              )}
            </div>
            <div>
              <h3>{t("cost")}</h3>
              <MeetupInput
                type="text"
                placeholder={t("cost_holder")}
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
            <div>
              <h3>{t("add_event_description")}</h3>
              <MeetupTextArea
                placeholder={t("add_event_description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {isMeetingId ? (
              <UpdateButton onClick={handleUpdateMeetup}>Update</UpdateButton>
            ) : (
              <MeetupButton type="submit">{t("post_meetup")}</MeetupButton>
            )}
          </form>
        </MeetupFormWrapper>
      </StyledPage>
    </div>
  );
};

export default MeetupForm;

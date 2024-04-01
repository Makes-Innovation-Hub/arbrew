import { useContext, useState, useEffect } from "react";
import {
  ModalSideBar,
  StyledSideBar,
  GoBack,
  DisplayMe,
  ProfileChat,
  FlagForLang,
  UlSideBar,
  LiSideBar,
  LinkSideBar,
  StyledHiddenButton,
} from "../styles";
import {
  BlackArrowLeft,
  ArrowDown,
  HomeIcon,
  ProfileIcon,
} from "../assets/index.jsx";
import Eng from "../assets/Eng.png";
import AR from "../assets/AR.png";
import HE from "../assets/HE.png";

import { useDispatch } from "react-redux";
import { setLanguage } from "../features/appLanguage/appLanguageSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanUser } from "../features/userRegister/userRegisterSlice";
import { UserContext } from "../contexts/loggedUser.context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SideBar({ openSideBar }) {
  const { t, i18n } = useTranslation();
  const [lenOptions, setLenOptions] = useState(false);
  const [whichLang, setWhichLang] = useState(() => {
    const savedLang = localStorage.getItem("lang");
    return savedLang === "ar" ? 2 : savedLang === "he" ? 1 : 0;
  });

  useEffect(() => {
    // Save the chosen language to local storage
    if (whichLang === 2) {
      localStorage.setItem("lang", "ar");
    } else if (whichLang === 1) {
      localStorage.setItem("lang", "he");
    } else {
      localStorage.setItem("lang", "en");
    }

    const langKey = whichLang === 2 ? "ar" : whichLang === 1 ? "he" : "en";
    i18n.changeLanguage(langKey);
  }, [whichLang, i18n]);

  let langArr = [
    [Eng, "English (US)"],
    [HE, "עברית"],
    [AR, "عربيه"],
  ];
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData: loggedUser } = useContext(UserContext);
  const baseClientUrl = `${import.meta.env.VITE_SERVER_BASE_URL}:5173`;

  return (
    <>
      <ModalSideBar
        onClick={() => {
          openSideBar(false);
        }}
      />
      <StyledSideBar>
        <GoBack
          onClick={() => {
            openSideBar(false);
          }}
        >
          <BlackArrowLeft />
        </GoBack>
        <DisplayMe>
          <ProfileChat profile={loggedUser.avatar} /> {loggedUser.name}
        </DisplayMe>
        <UlSideBar>
          <LinkSideBar>
            <LiSideBar
              onClick={() => {
                navigate("/chooseHub");
                openSideBar(false);
              }}
            >
              <HomeIcon />
              {t("home")}
            </LiSideBar>
          </LinkSideBar>
          <LinkSideBar>
            <LiSideBar
              onClick={() => {
                navigate("/profile", { state: loggedUser });
              }}
            >
              {" "}
              <ProfileIcon />
              {t("profile")}
            </LiSideBar>
          </LinkSideBar>

          <LiSideBar
            href=""
            onClick={() => {
              lenOptions ? setLenOptions(false) : setLenOptions(true);
            }}
          >
            {" "}
            <FlagForLang flag={langArr[whichLang][0]} /> {langArr[whichLang][1]}{" "}
            {console.log("langArr[whichLang][0]: ", langArr[whichLang][0])}
            {lenOptions && <ArrowDown />}
          </LiSideBar>
          {lenOptions && (
            <div>
              {langArr.map((len, i) => {
                return (
                  i !== whichLang && (
                    <LiSideBar
                      key={i}
                      href=""
                      onClick={() => {
                        lenOptions ? setLenOptions(false) : setLenOptions(true);
                        setWhichLang(i);
                        dispatch(setLanguage(langArr[whichLang][1]));
                      }}
                    >
                      <FlagForLang flag={len[0]} /> {len[1]}{" "}
                    </LiSideBar>
                  )
                );
              })}
            </div>
          )}
          <LiSideBar>
            <StyledHiddenButton
              style={{ color: "rgb(155,70,70)", fontWeight: "bold" }}
              onClick={() => {
                dispatch(cleanUser());
                sessionStorage.removeItem("loggedUser");
                logout({ returnTo: baseClientUrl });
              }}
            >
              {t("logout")}
            </StyledHiddenButton>
          </LiSideBar>
        </UlSideBar>
      </StyledSideBar>
    </>
  );
}

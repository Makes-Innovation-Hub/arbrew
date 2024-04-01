import { useState } from "react";
import Header from "../../components/Header";
import { Hamburger, SmallGlass } from "../../assets";

import SideBar from "../../components/SideBar";
import {
  StyledMargin,
  StyledPage,
  PageTitle24,
  MainButton,
} from "../../styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function WorkPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSideBar, setIsSideBar] = useState(false);

  return (
    <div>
      {isSideBar && <SideBar openSideBar={setIsSideBar} />}
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <div onClick={() => setIsSideBar(true)}>
              <Hamburger />
            </div>
          }
          title={<SmallGlass />}
        />
      </StyledMargin>
      <StyledPage>
        <PageTitle24>{t("work_page")}</PageTitle24>
        <MainButton onClick={() => navigate("/work-conversation?hub=work")}>
          {t("chat")}
        </MainButton>
        <MainButton onClick={() => navigate("/job-board")}>
          {t("job_board")}
        </MainButton>
        <MainButton onClick={() => navigate("/postJob")}>
          {t("post_job")}
        </MainButton>
        <MainButton onClick={() => navigate("/myJobsPosted")}>
          {t("my_job_posts")}
        </MainButton>
      </StyledPage>
    </div>
  );
}

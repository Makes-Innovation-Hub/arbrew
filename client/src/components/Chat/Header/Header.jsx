import profileImg from "../../../assets/prf.webp";
import arrowIcon from "../../../assets/arrow.svg";
import { HeaderWrapper } from "../../../styles/Chat/Header/HeaderWrapper";
import { ImageWrapper } from "../../../styles/Chat/Header/ImageWrapper";
import { useNavigate } from "react-router-dom";

export default function Header({ receiver }) {
  const { img, name } = receiver;
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <img
        src={arrowIcon}
        onClick={() => {
          navigate(-1);
        }}
      />
      <ImageWrapper>
        <img
          src={img}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="receiver img"
        />
      </ImageWrapper>
      <label style={{ color: "#FFFFFF", fontWeight: "1000" }}>{name}</label>
    </HeaderWrapper>
  );
}

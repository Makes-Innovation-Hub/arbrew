import CoffeMug from "../../../assets/CoffeeMugWithGreenBG.svg";
import { Suggestion, SuggestionText } from "../../styles/Suggestion";

export default function MessageBox({ message, loggedUser }) {
  if (message.sender === "server") {
    return (
      <Suggestion>
        <img src={CoffeMug} alt="coffe mug symbol" />
        <SuggestionText> {message.content}</SuggestionText>
      </Suggestion>
    );
  }
  return (
    <div
      style={{
        padding: "0.5rem",
        margin: "1rem",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.15)",
        width: "70%",
        alignSelf: message.sender === loggedUser.id ? "flex-end" : "flex-start",
        borderRadius:
          message.sender === loggedUser.id
            ? "0.9rem 0.9rem 0 0.9rem"
            : "0 0.9rem 0.9rem 0.9rem",
        backgroundColor:
          message.sender === loggedUser.id ? "#50924E" : "#FFFFFF",
        color: message.sender === loggedUser.id ? "#FFFFFF" : "#3D4260",
      }}
    >
      {/* <p>{message.isProfanity ? message.profanity : message.content}</p> */}
      <p dir="rtl">
        {message.sender === loggedUser.id
          ? message?.originalContent
          : message?.translatedContent}
      </p>
    </div>
  );
}

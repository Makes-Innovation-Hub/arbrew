import CoffeeMug from "../../../assets/CoffeeMugWithGreenBG.svg";
import PaperPlane from "../../../assets/PaperPlane.svg";

import { InputAreaContainer } from "../../../styles/Chat/InputArea/InputAreaContainer";
import { RecommendedButton } from "../../../styles/Chat/InputArea/RecommendedButton";
import { InputComponent } from "../../../styles/Chat/InputArea/InputComponent";
import { InputWrapper } from "../../../styles/Chat/InputArea/InputWrapper";
import { SendButton } from "../../../styles/Chat/InputArea/SendButton";
import { useGenerateConversationTopicsMutation } from "../../../features/conversations/conversationApi.slice";
import { useEffect, useState } from "react";

const InputArea = ({
  handleSendMsg,
  loggedUserDetails,
  receiverUserDetails,
  setSuggestions,
  currentSuggestions,
}) => {
  const [getSuggestions, { isSuccess, isLoading, isError, data }] =
    useGenerateConversationTopicsMutation();
  const [text, setText] = useState("");
  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleOnClick = async () => {
    await handleSendMsg(text);
    setText("");
  };
  // const handleEnterPress = (e) => {
  //   if (e.key === "Enter") {
  //     setText(e.target.value);
  //     return handleOnClick();
  //   }
  // };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError) {
      const suggestions = JSON.parse(data.suggestions.message.content);
      if (suggestions && suggestions.length > 0) {
        setSuggestions(suggestions);
      }
    }
  }, [isSuccess, isLoading, isError]);
  return (
    <InputWrapper>
      <InputAreaContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleOnClick();
        }}
      >
        <RecommendedButton
          onClick={() => {
            if (currentSuggestions.length > 0) {
              setSuggestions();
            } else {
              const suggestionObj = {
                user1Data: loggedUserDetails,
                user2Data: receiverUserDetails,
              };
              getSuggestions(suggestionObj);
            }
          }}
        >
          <img src={CoffeeMug} />
        </RecommendedButton>
        <InputComponent
          value={text}
          onChange={handleInputChange}
          // onKeyUp={handleEnterPress}
          placeholder="Start typing..."
        />
        <SendButton onClick={handleOnClick}>
          <img src={PaperPlane} />
        </SendButton>
      </InputAreaContainer>
    </InputWrapper>
  );
};
export default InputArea;

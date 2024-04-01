import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { ChatLayout } from "../../styles/Chat/ChatLayout.jsx";
import { InputArea } from "../../components/index.js";
import ChatDisplayArea from "../../components/Chat/ChatDisplayArea/ChatDisplayArea.jsx";

import Header from "../../components/Chat/Header/Header.jsx";
import {
  useCreateChatMutation,
  useGetChatByUsersIdsQuery,
} from "../../features/chatDataApi.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const ENDPOINT = import.meta.env.VITE_SERVER_BASE_URL;

let socket;
socket = io(ENDPOINT);
const Chat = () => {
  const [searchParams] = useSearchParams();
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const loggedUser = useSelector((state) => state.userRegister);
  const { data, isSuccess, isLoading, isError, error, refetch } =
    useGetChatByUsersIdsQuery({
      sender: searchParams.get("sender"),
      receiver: searchParams.get("receiver"),
      hub: searchParams.get("hub"),
    });
  const [createChat] = useCreateChatMutation();
  const location = useLocation();

  const handleSendMsg = async (text) => {
    if (error?.data === "Chat not found") {
      // console.log(error);
      const res = await createChat({
        user1Id: loggedUser.id,
        user2Id: searchParams.get("receiver"),
        hub: searchParams.get("hub"),
        message: text,
      });
    }
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { sender: loggedUser.id, originalContent: text, date: new Date() },
    ]);
    socket.emit("new_message", text, chatId, loggedUser, receiver);
  };

  const addSuggestionToMsgs = (newSuggestions) => {
    const suggestionsUpdated = newSuggestions ? newSuggestions : suggestions;
    const suggestion = suggestionsUpdated.pop();
    const suggestionObj = {
      sender: "server",
      content: suggestion,
    };
    setSuggestions([...suggestionsUpdated]);
    setMessages((prev) => [...prev, suggestionObj]);
  };
  useEffect(() => {
    if (isError) {
      console.log(error?.data);
    }
  }, [isError, error]);
  useEffect(() => {
    refetch();
  }, [location.pathname]);
  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      setMessages((prev) => [...data.chat.messages]);
      setReceiver(data.receiverUser);
      setChatId(data.chat.id);
    }
  }, [data, isSuccess, isLoading]);
  useEffect(() => {
    if (!chatId) return;

    const chatData = {
      chatId,
    };
    socket.emit("room_setup", chatData);
    socket.on("send_message", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
  }, [chatId, loggedUser, receiver]);
  return (
    <ChatLayout>
      <Header
        receiver={{
          name: receiver?.name || location?.state?.receiverName,
          img: receiver?.avatar || location?.state?.receiverImg,
        }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ChatDisplayArea messages={messages} />
          <InputArea
            handleSendMsg={handleSendMsg}
            loggedUserDetails={loggedUser?.userDetails}
            receiverUserDetails={receiver?.userDetails}
            currentSuggestions={suggestions}
            setSuggestions={addSuggestionToMsgs}
          />
        </>
      )}
    </ChatLayout>
  );
};

export default Chat;

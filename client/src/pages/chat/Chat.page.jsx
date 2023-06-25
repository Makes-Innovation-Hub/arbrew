import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { genChatId } from "../../helpers/genChatId.jsx";
// import { useSelector } from "react-redux";

import { ChatLayout } from "../../styles/Chat/ChatLayout";
import { InputArea } from "../../components/index.js";
import ChatDisplayArea from "../../components/Chat/ChatDisplayArea/ChatDisplayArea";

import Header from "../../components/Chat/Header/Header";
import { useGetChatByNamesQuery } from "../../features/userDataApi.js";

const ENDPOINT =
  import.meta.env.VITE_SERVER_BASE_URL + ":" + import.meta.env.VITE_SERVER_PORT;

let socket;

const Chat = () => {
  const params = useParams();
  const { sender, reciever, originLang, targetLang } = params;
  const usersArr = [sender, reciever];
  const [msgText, setMsgText] = useState("");
  const chatData = {
    chatId: genChatId(usersArr),
    sender: sender,
    reciever: reciever,
    originLang: originLang,
    targetLang: targetLang,
    content: msgText,
  };
  const [messages, setMessages] = useState([]);
  const [showTopics, setShowTopics] = useState({
    isShowed: false,
    text: "",
  });
  const [showSpinner, setShowSpinner] = useState({
    isShowed: false,
  });

  //!MUST be refactored and replaced when rtk query and chatschema is configured
  //!
  const { data, isSuccess, isLoading, isError, error } = useGetChatByNamesQuery(
    [usersArr, originLang]
  );

  const handleChange = (e) => setMsgText(e.target.value);

  const handleSendMsg = () => {
    socket.emit("new_message", chatData);
    setMsgText("");
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("room_setup", chatData);
    socket.on("message_to_reciever", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
    socket.on("message_to_sender", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
    // return () =>socket.on("disconnect",()=>console.log(`${sender} successfully disconnected from chat: ${chatId}`))
  }, []);

  return (
    <ChatLayout>
      <Header reciever={{ name: reciever }} />
      <ChatDisplayArea
        showTopics={showTopics.text}
        showSpinner={showSpinner.isShowed}
        messages={messages}
      />
      {isLoading && <h2>LOADING...</h2>}
      {isSuccess && <ChatDisplayArea messages={messages} />}
      <InputArea
        typedMsg={msgText}
        handleChange={handleChange}
        handleSendMsg={handleSendMsg}
        setShowTopics={setShowTopics}
        setShowSpinner={setShowSpinner}
      />
    </ChatLayout>
  );
};

export default Chat;

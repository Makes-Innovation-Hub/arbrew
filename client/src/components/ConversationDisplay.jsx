import React, { Component } from "react";
import { DisplayChatsStyle, ProfileChat, ContentChat } from "../styles";
import { Link } from "react-router-dom";

export const ConversationDisplay = ({ chat }) => {
  return (
    <Link
      to={`/chat-page/?sender=${chat?.sender._id}&receiver=${chat?.receiver._id}&hub=${chat?.chatHub}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <DisplayChatsStyle>
        <ProfileChat profile={chat.receiver.avatar} />
        <ContentChat>
          <p>{chat.receiver.name}</p>
          <p>{chat.lastMessageContent}</p>
        </ContentChat>
      </DisplayChatsStyle>
    </Link>
  );
};

export default ConversationDisplay;

import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import {
  StyledPage,
  StyledMargin,
  NoConversationStyle,
  ContentConversationPage,
  ConversationPageStyle,
  ChatsDisplay,
  ButtonForChats,
  BlockDiv,
} from "../../styles";
import { SmallGlass, Hamburger } from "../../assets";
import ConversationDisplay from "../../components/ConversationDisplay";
import { useGetUserChatsListQuery } from "../../features/chatDataApi";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { addAllDetailsConnectedUser } from "../../features/userRegister/userRegisterSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ConversationPage = () => {
  const navigate = useNavigate();
  const [isSideBar, setIsSideBar] = useState(false);
  const { search } = useLocation();
  const hub = search.split("=")[1];

  const {
    data: chats,
    error,
    isLoading,
    refetch,
  } = useGetUserChatsListQuery(hub);
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.log(error);
    return <div>Error occurred while fetching chats.</div>;
  }
  return (
    <div>
      {isSideBar && (
        <div>
          <SideBar openSideBar={setIsSideBar} />
        </div>
      )}
      <StyledMargin direction="vertical" margin="5%">
        <Header
          leftIcon={
            <div
              onClick={() => {
                setIsSideBar(true);
              }}
            >
              <Hamburger />
            </div>
          }
          title={<SmallGlass />}
        />
      </StyledMargin>
      <StyledPage>
        {chats && chats.length !== 0 ? (
          <ConversationPageStyle>
            <div>Conversation</div>
            <ChatsDisplay>
              {chats.map((chat, i) => {
                return <ConversationDisplay key={i} chat={chat} />;
              })}
            </ChatsDisplay>
            <BlockDiv />
            <ButtonForChats
              onClick={() => {
                navigate("/search-friends");
              }}
            >
              Search for friends to chat
            </ButtonForChats>
          </ConversationPageStyle>
        ) : (
          <ConversationPageStyle>
            <NoConversationStyle>No Conversation</NoConversationStyle>
            <ContentConversationPage>
              Add some friends and start chatting with them, Your conversations
              will show up here.
            </ContentConversationPage>
            <ButtonForChats
              onClick={() => {
                navigate("/search-friends");
              }}
            >
              Search for friends to chat
            </ButtonForChats>
          </ConversationPageStyle>
        )}
      </StyledPage>
    </div>
  );
};
export default ConversationPage;

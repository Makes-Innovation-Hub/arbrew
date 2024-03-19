import { Link } from "react-router-dom";
import Friend from "../Friend.jsx";
import StyledLink from "./StyleSearchFriendList.jsx";
const FriendsList = ({ friendsArr, loggedUser, originLang }) => {
  console.log(friendsArr);
  return friendsArr.map((user) => {
    const { name: friend, avatar, subId, userDetails, _id } = user;
    const { nationality, interests, nativeLanguage: targetLang } = userDetails;
    return (
      <Friend
        key={subId}
        name={friend}
        img={avatar}
        flag={nationality}
        hobbies={interests}
        userDetails={userDetails}
        chatPage={`/chat-page/${loggedUser.id}?hub=hobbies&new=true&receiver=${_id}&avatar=${avatar}&name=${friend}`}
      />
    );
  });
};

export default FriendsList;

import { ChoosenPerson as ChatInfo, FriendImage } from "../Styles";
import { ChoosenI } from "./ChoosenPerson";

const ChoosenChat = ({ logOut, name, image }: ChoosenI) => {
  return (
    <ChatInfo>
      <button onClick={logOut}>logOut</button>
      <div>i'm a chat! {name}</div>
      <FriendImage src={image} alt="friend image" />
    </ChatInfo>
  );
};

export default ChoosenChat;

import { useEffect } from "react";
import { useState } from "react";
import { ChatMain, ActualChat, Message, MsgHandle } from "../Styles";
import ChoosenPerson from "./ChoosenPerson";
interface ChatI {
  logOut: () => any;
  selectedUser: number;
  loggedUserId: number;
}

const Chat = ({ logOut, selectedUser, loggedUserId }: ChatI) => {
  const [sUserInfo, setSUserInfo] = useState({});
  const [messages, setMessages] = useState([])
  useEffect(() => {
    fetch(`/user_info/${selectedUser}`)
      .then((res) => res.json())
      .then((data) => setSUserInfo(data));
    console.log(`select user time: ${Date.now()}`);
  }, [selectedUser]);

  return (
    <ChatMain>
      <ChoosenPerson
        logOut={logOut}
        user_image={sUserInfo.user_image_link}
        user_name={sUserInfo.name}
      />

      <ActualChat>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <button onClick={() => console.log(selectedUser)}>
          selected user log
        </button>
      </ActualChat>
      <MsgHandle></MsgHandle>
    </ChatMain>
  );
};

export default Chat;

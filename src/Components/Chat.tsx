import { useEffect } from "react";
import { useState } from "react";
import { ChatMain, ActualChat, Message, MsgHandle } from "../Styles";
import ChoosenPerson from "./ChoosenPerson";
interface ChatI {
  logOut: () => any;
  selectedUser: number;
  loggedUserId: number;
}
interface MessageI {
  message_id: number;
  message_sender_id: number;
  message_group_id: number;
  message_text: string;
  message_type: string;
  message_img_link?: string;
  message_send_date: Date;
}
const Chat = ({ logOut, selectedUser, loggedUserId }: ChatI) => {
  const [sUserInfo, setSUserInfo] = useState({});
  // eslint-disable-next-line
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch(`/user_info`, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({ id: selectedUser }),
      });
      const userData = await userResponse.json();
      await setSUserInfo(userData);
      console.log(`select user time: ${Date.now()}`);
    };
    fetchData();
  }, [selectedUser]);

  return (
    <ChatMain>
      <ChoosenPerson
        logOut={logOut}
        user_image={sUserInfo.user_image_link}
        user_name={sUserInfo.user_name}
      />

      <ActualChat>
        {messages.map((message: MessageI) => {
          return (
            <Message
              loggedUser={message.message_sender_id === loggedUserId ? 1 : 0}
            >
              {message.message_text}
            </Message>
          );
        })}
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

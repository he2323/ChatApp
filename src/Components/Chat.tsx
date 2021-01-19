import { useEffect } from "react";
import { useState } from "react";
import { ChatMain, ActualChat, Message, MsgHandle } from "../Styles";
import ChoosenPerson from "../Containers/ChoosenPerson";
import { SelElementI } from "./Logged";
import ChoosenChat from "../Containers/ChoosenChat";
import StartGreet from "../Containers/StartGreet";
import FriendMng from "./FriendMng";
interface ChatI {
  logOut: () => void;
  updateUser: () => void;
  selectedElement: SelElementI;
  loggedUserId: number;
}
const Chat = ({ logOut, updateUser, selectedElement, loggedUserId }: ChatI) => {
  const [sElementInfo, setsElementInfo] = useState({});
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchElementData = async () => {
      console.log(selectedElement);
      const elementResponse = await fetch(
        selectedElement.type === "friend" ? "/user_info" : "/chat_info",
        {
          method: "POST",
          headers: {
            content_type: "application/json",
          },
          body: JSON.stringify({ id: selectedElement.id }),
        }
      );
      const elementData = await elementResponse.json();
      await setsElementInfo(elementData);
    };
    const fetchMessages = async () => {
      const fetchedMessages = await fetch("/messages_info", {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({ messages_ids: sElementInfo.messages }),
      });
      const messagesData = await fetchedMessages.json();
      await setMessages(messagesData);
    };
    if (selectedElement.type !== "start") {
      fetchElementData();
      fetchMessages();
    }
  }, [selectedElement]);

  return (
    <ChatMain>
      {selectedElement.type === "friend" ? (
        <ChoosenPerson
          logOut={logOut}
          image={sElementInfo.image_link}
          name={sElementInfo.name}
        />
      ) : selectedElement.type === "chat" ? (
        <ChoosenChat
          logOut={logOut}
          image={sElementInfo.image_link}
          name={sElementInfo.name}
        />
      ) : (
        <StartGreet />
      )}

      {selectedElement.type === "chat" ? (
        <ActualChat>
          {messages.map((msg: any) => {
            <Message loggedUser={msg.sender_id === loggedUserId ? 1 : 0}>
              {msg.text}
            </Message>;
          })}
          <Message loggedUser={1}>somerandom text shit</Message>
          <button onClick={() => console.log(selectedElement)}>
            selected user log
          </button>
        </ActualChat>
      ) : selectedElement.type === "friend" ? (
        <FriendMng
          updateUser={updateUser}
          selectedElement={selectedElement}
          loggedUser={loggedUserId}
        />
      ) : (
        <StartGreet isPlaceholder={true} />
      )}
      <MsgHandle></MsgHandle>
    </ChatMain>
  );
};

export default Chat;

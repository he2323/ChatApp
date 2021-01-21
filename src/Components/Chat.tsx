import { useEffect } from "react";
import { useState } from "react";
import { ChatMain, ActualChat, Message } from "../Styles";
import ChoosenPerson from "../Containers/ChoosenPerson";
import { SelElementI } from "./Logged";
import ChoosenChat from "../Containers/ChoosenChat";
import StartGreet from "../Containers/StartGreet";
import FriendMng from "./FriendMng";
import MessasgeHandle from "../Containers/MessasgeHandle";
import RepMsg from "../Containers/RepMsg"
interface ChatI {
  logOut: () => void;
  updateUser: () => void;
  selectedElement: SelElementI;
  loggedUserId: number;
}
const Chat = ({ logOut, updateUser, selectedElement, loggedUserId }: ChatI) => {
  const [sElementInfo, setsElementInfo] = useState({});
  const [fetchMsg, setfetchMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(async () => {
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
      console.log(elementData);
      setsElementInfo(elementData);
      setfetchMsg(true);
    };
    const fetchMessages = async () => {
      console.log(sElementInfo);
      const fetchedMessages = await fetch("/messages_info", {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({
          messages_ids:
            sElementInfo.messages
        }),
      });
      const messagesData = await fetchedMessages.json();
      setMessages(messagesData.messages);
      console.log(messagesData.messages);
    };
    if (selectedElement.type !== "start") {
      await fetchElementData();
      if (
        selectedElement.type === "chat" &&
        sElementInfo.messages !== undefined
      )
        await fetchMessages();
    }
    
  }, [selectedElement]);
  const sendMsg = async () => {
    await fetch("/post_msg", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        message: message,
        sender_id: loggedUserId,
        chat_id: selectedElement.id,
      }),
    });
    await updateUser();
    setfetchMsg(!fetchMsg);
  };

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
          <RepMsg loggedUserId = {loggedUserId} messages={messages}/>
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
      <MessasgeHandle
        message={message}
        changeMessage={setMessage}
        sendMsg={sendMsg}
      />
    </ChatMain>
  );
};

export default Chat;

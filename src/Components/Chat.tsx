import { useEffect } from "react";
import { useState } from "react";
import { ChatMain, ActualChat } from "../Styles";
import ChoosenPerson from "../Containers/ChoosenPerson";
import { SelElementI } from "./Logged";
import ChoosenChat from "../Containers/ChoosenChat";
import StartGreet from "../Containers/StartGreet";
import FriendMng from "./FriendMng";
import MessasgeHandle from "../Containers/MessasgeHandle";
import RepMsg from "../Containers/RepMsg";
import { useRef } from "react";
interface ChatI {
  logOut: () => void;
  updateUser: () => void;
  selectedElement: SelElementI;
  loggedUserId: number;
  loggedUSer: any;
}
type ChatInfoT = {
  _id: number;
  status: boolean;
  messages: number[];
  members_ids: number[];
  img_link: string;
  create_date: string;
}
const Chat = ({
  logOut,
  updateUser,
  selectedElement,
  loggedUserId,
  loggedUSer,
}: ChatI) => {
  const messagesEndRef = useRef(null);
  const [sElementInfo, setsElementInfo] = useState({});
  const [fetchMsg, setfetchMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const fetchElementData = async (id: number) => {
    const elementResponse = await fetch(
      selectedElement.type === "friend" ? "/user_info" : "/chat_info",
      {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );
    const elementData = await elementResponse.json();
    setsElementInfo(elementData);
    setfetchMsg(true);
    return elementData;
  };

  const fetchMessages = async (messages: number[]) => {
    const fetchedMessages = await fetch("/messages_info", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        messages_ids: messages,
      }),
    });
    const messagesData = await fetchedMessages.json();
    setMessages(messagesData.messages);
  };
  useEffect(() => {
    if (selectedElement.type === "chat") {
      setfetchMsg(false);
    }
    scrollToBottom();
  }, [selectedElement]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkMessages = async() =>{if (selectedElement.type !== "start") {
      const data: ChatInfoT = await fetchElementData(selectedElement.id);
      if (selectedElement.type === "chat") {
        fetchMessages(data.messages);
      }
    }}
    checkMessages();
    scrollToBottom();
  }, [selectedElement, fetchMsg, loggedUSer]);

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
      {/* // */}
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
      {/* // */}
      {selectedElement.type === "chat" ? (
        <ActualChat>
          <RepMsg
            loggedUserId={loggedUserId}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
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
      {/*  */}
      <MessasgeHandle
        message={message}
        changeMessage={setMessage}
        sendMsg={sendMsg}
      />
      {/*  */}
    </ChatMain>
  );
};

export default Chat;

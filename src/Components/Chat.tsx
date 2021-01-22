import { useEffect } from "react";
import { useState } from "react";
import { ChatMain, ActualChat, Message } from "../Styles";
import ChoosenPerson from "../Containers/ChoosenPerson";
import { SelElementI } from "./Logged";
import ChoosenChat from "../Containers/ChoosenChat";
import StartGreet from "../Containers/StartGreet";
import FriendMng from "./FriendMng";
import MessasgeHandle from "../Containers/MessasgeHandle";
import RepMsg from "../Containers/RepMsg";
import { useRef } from "react";
import { useInterval } from "react-use";
interface ChatI {
  logOut: () => void;
  updateUser: () => void;
  selectedElement: SelElementI;
  loggedUserId: number;
  loggedUSer: any;
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
    console.log(`fetchElementData o id ${id}`);
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

  const fetchMessages = async (data: any) => {
    const fetchedMessages = await fetch("/messages_info", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        messages_ids: data.messages,
      }),
    });
    const messagesData = await fetchedMessages.json();
    setMessages(messagesData.messages);
  };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     console.log(`inter przed if  id:  ${selectedElement.id}`);
  //     console.log(updateUser());
  //   }, 10000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  useEffect(() => {
    if (selectedElement.type === "chat") {
      console.log("zmiana fetch");
      setfetchMsg(false);
    }
    scrollToBottom();
  }, [selectedElement]);
useEffect(() => {
  scrollToBottom()
}, [messages])
  useEffect(async () => {
    if (selectedElement.type !== "start") {
      const data = await fetchElementData(selectedElement.id);
      if (selectedElement.type === "chat") fetchMessages(data);
    }
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

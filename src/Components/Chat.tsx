import { useEffect, useState, useRef } from "react";
import { ChatMain, ActualChat } from "../Styles";
import ChoosenPerson from "../Containers/ChoosenPerson";
import { SelElementI } from "./UserPanel";
import ChoosenChat from "../Containers/ChoosenChat";
import StartGreet from "../Containers/StartGreet";
import FriendMng from "./FriendMng";
import MessasgeHandle from "../Containers/MessasgeHandle";
import RepMsg from "../Containers/RepMsg";
import { loggedUSerT } from "./App";

interface ChatI {
  logOut: () => void;
  updateUser: () => void;
  selectedElement: SelElementI;
  loggedUserId: number;
  loggedUSer: loggedUSerT;
}
type ChatInfoT = {
  _id: number;
  status: boolean;
  messages: number[];
  members_ids: number[];
  img_link: string;
  create_date: string;
};
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
  const [oldMessages, setOldMessages] = useState([]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const fetchElementData = async (id: number) => {
    let url = "";
    if (selectedElement.type === "friend") url = "/user_info";
    else if (selectedElement.type === "chat") url = "/chat_info";
    else url = "";
    if (url.length > 0) {
      const elementResponse = await fetch(url, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const elementData = await elementResponse.json();
      setsElementInfo(elementData);
      setfetchMsg(true);
      return elementData;
    }
    return {};
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
  // useEffect(() => {
  //   if (selectedElement.type === "chat") {
  //     setfetchMsg(false);
  //   }
  // }, [selectedElement]);

  useEffect(() => {
    if (oldMessages.length > 0) {
      if (
        oldMessages[oldMessages.length - 1]._id !==
        messages[messages.length - 1]._id
      ) {
        scrollToBottom();
      } else {
        setOldMessages([...messages]);
      }
    }
  }, [messages]);

  useEffect(() => {
    const checkMessages = async () => {
      if (selectedElement.type !== "start") {
        const data: ChatInfoT = await fetchElementData(selectedElement.id);
        if (selectedElement.type === "chat") {
          fetchMessages(data.messages);
        }
      }
    };
    checkMessages();
    scrollToBottom();
  }, [selectedElement, fetchMsg, loggedUSer]);

  const sendMsg = async () => {
    if (message.length > 0) {
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
      scrollToBottom();
    }
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
      ) : selectedElement.type === "friendMng" ? (
        <FriendMng
          updateUser={updateUser}
          selectedElement={selectedElement}
          loggedUser={loggedUSer}
        />
      ) : (
        <StartGreet isPlaceholder={true} />
      )}
      {/*  */}
      {selectedElement.type === "chat" ? (
        <MessasgeHandle
          message={message}
          changeMessage={setMessage}
          sendMsg={sendMsg}
        />
      ) : (
        <StartGreet />
      )}
      {/*  */}
    </ChatMain>
  );
};

export default Chat;

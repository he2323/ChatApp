import { ElementI, SelElementI } from "../Components/Logged";
import { Friend as Chat } from "./Friend";


interface ChatsListI {
  chats_data: ElementI[];
  loggedUserId: number;
  selectChat: ({ id, type }: SelElementI) => void;
}
const ChatList = ({ chats_data, loggedUserId, selectChat }: ChatsListI) => {

  return (
    <>
      {chats_data.map((chat: ElementI) => (
        <Chat
          id={chat.id}
          key={chat.id}
          name={chat.name}
          image={chat.img_link}
          status={chat.status}
          selectUser={selectChat}
          type={"chat"}
        />
      ))}
    </>
  );
};

export default ChatList;

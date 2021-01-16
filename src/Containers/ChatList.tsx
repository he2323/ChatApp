import { ElementI, SelElementI } from "../Components/Logged";
import { Friend as Chat } from "./Friend";


interface ChatsListI {
  chats_data: ElementI[];
  loggedUserId: number;
  selectChat: ({ id, type }: SelElementI) => any;
}
const ChatList = ({ chats_data, loggedUserId, selectChat }: ChatsListI) => {

  return (
    <>
      {chats_data.map((chat: ElementI) => (
        <Chat
          id={chat.id}
          key={chat.name}
          name={chat.name}
          image={chat.image_link}
          status={chat.status}
          selectUser={selectChat}
          type={"chat"}
        />
      ))}
    </>
  );
};

export default ChatList;

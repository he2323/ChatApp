import { ElementI, SelElementI } from "./Logged";
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
          key={chat.name}
          id={chat.id}
          name={chat.name}
          image={chat.image_link}
          status={chat.status}
          selectUser={selectChat}
        />
      ))}
    </>
  );
};

export default ChatList;

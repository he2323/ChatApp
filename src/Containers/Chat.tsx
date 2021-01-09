import {
  ChatMain,
  ChoosenPerson,
  ActualChat,
  Message,
  MsgHandle,
} from "../Styles";

interface ChatI{
  logOut: () => any;
  selectedUser: number;
  loggedUserId: number;
}

const Chat = ({logOut, selectedUser, loggedUserId}:ChatI) => {
  return (
    <ChatMain>
      <ChoosenPerson>
        <button onClick={logOut}>logOut</button>
      </ChoosenPerson>
      <ActualChat>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <button onClick={()=> console.log(selectedUser)}>selected user log</button>
      </ActualChat>
      <MsgHandle></MsgHandle>
    </ChatMain>
  );
};

export default Chat;

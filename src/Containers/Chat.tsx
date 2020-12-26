import {ChatMain, ChoosenPerson, ActualChat, Message, MsgHandle} from "../Styles"

const Chat = (): JSX.Element => {
  return (
    <ChatMain>
      <ChoosenPerson></ChoosenPerson>
      <ActualChat>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
        <Message loggedUser={0}>somerandom text shit</Message>
        <Message loggedUser={1}>somerandom text shit</Message>
      </ActualChat>
      <MsgHandle></MsgHandle>
    </ChatMain>
  );
};

export default Chat;

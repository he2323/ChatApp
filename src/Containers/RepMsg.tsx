import { Message } from "../Styles";
type MessageT = {
  _id: number;
  text: string;
  sender_id: number;
}
interface RepMsgI{
  messages: MessageT[];
  loggedUserId: number;
  messagesEndRef: any;
}
const RepMsg = ({ messages, loggedUserId, messagesEndRef }: RepMsgI) => {
  return (
    <>
      {messages.map((msg: MessageT) => (
        <Message key={msg._id} loggedUser={msg.sender_id === loggedUserId ? 1 : 0}>
          {msg.text}
        </Message>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default RepMsg;

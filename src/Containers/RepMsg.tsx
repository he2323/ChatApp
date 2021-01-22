import { Message } from "../Styles";

const RepMsg = ({ messages, loggedUserId, messagesEndRef }: any) => {
  return (
    <>
      {messages.map((msg: any) => (
        <Message key={msg._id} loggedUser={msg.sender_id === loggedUserId ? 1 : 0}>
          {msg.text}
        </Message>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default RepMsg;

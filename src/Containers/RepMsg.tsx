import { Message } from "../Styles";

const RepMsg = ({ messages, loggedUserId }: any) => {
  return (
    <>
      {messages.map((msg: any) => (
        <Message loggedUser={msg.sender_id === loggedUserId ? 1 : 0}>
          {msg.text}
        </Message>
      ))}
    </>
  );
};

export default RepMsg;

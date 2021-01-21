import { MsgHandle } from "../Styles";

interface MsgI {
  message: string;
  changeMessage: (value: string) => void;
  sendMsg: () => void
}

const MessasgeHandle = ({ message, changeMessage, sendMsg }: MsgI) => {
  return (
    <MsgHandle>
      <textarea
        name="msg"
        id="msg"
        placeholder="wiadomość"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>changeMessage(e.currentTarget.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </MsgHandle>
  );
};

export default MessasgeHandle;

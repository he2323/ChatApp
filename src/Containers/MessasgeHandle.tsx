import { MsgHandle, MsgInput, MsgSendButton } from "../Styles";
import {AiOutlineSend} from "react-icons/ai"
interface MsgI {
  message: string;
  changeMessage: (value: string) => void;
  sendMsg: () => void;
}

const MessasgeHandle = ({ message, changeMessage, sendMsg }: MsgI) => {
  return (
    <MsgHandle>
      <MsgInput
        name="msg"
        id="msg"
        placeholder="wiadomość"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          changeMessage(e.currentTarget.value)
        }
      />
      <MsgSendButton onClick={sendMsg}><AiOutlineSend/></MsgSendButton>
    </MsgHandle>
  );
};

export default MessasgeHandle;

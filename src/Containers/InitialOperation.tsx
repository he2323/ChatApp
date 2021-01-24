import { InitialOperationItemT } from "../Components/App";
import {
  MainLogin,
  LoginImg,
  Forms,
  LoginLabel as RegisterLabel,
  LoginButton as RegisterButton,
} from "../Styles";
import InputField from "./InputField";

interface InitialOperationI {
  items: InitialOperationItemT[];
  text: string;
  changedestinationFunc: () => void;
  func: () => void;
}
const InitialOperation = ({
  items,
  text,
  changedestinationFunc,
  func,
}: InitialOperationI) => {
  return (
    <MainLogin>
      <LoginImg />
      <Forms>
        <RegisterLabel>Member {text}</RegisterLabel>
        {items.map((item: InitialOperationItemT, index: number) => (
          <InputField
            key={index}
            icon={item.icon}
            type={item.type}
            placeholder={item.placeholder}
            value={item.value}
            changeValue={item.changeFun}
          />
        ))}
        <RegisterButton onClick={func}>{text}</RegisterButton>
        <div>
          <div onClick={changedestinationFunc}>try to {text}</div>
        </div>
      </Forms>
    </MainLogin>
  );
};

export default InitialOperation;

import { InitialOperationItemT } from "../Components/App";
import {
    MainInitialOperation,
  InitialOperationImg,
  Forms,
  InitialOperationLabel,
  InitialOperationButton,
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
    <MainInitialOperation>
      <InitialOperationImg />
      <Forms>
        <InitialOperationLabel>Member {text}</InitialOperationLabel>
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
        <InitialOperationButton onClick={func}>{text}</InitialOperationButton>
        <div>
          <div onClick={changedestinationFunc}>try to {text}</div>
        </div>
      </Forms>
    </MainInitialOperation>
  );
};

export default InitialOperation;

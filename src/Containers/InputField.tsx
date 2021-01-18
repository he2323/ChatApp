import { InputContainer, InputIcon, InputAct } from "../Styles";

interface InputI {
  icon: any;
  type: string;
  placeholder: string;
  value: string;
  changeValue: (value: string) => void;
}
const InputField = ({
  icon,
  type,
  placeholder,
  value,
  changeValue,
}: InputI) => {
  return (
    <InputContainer>
      <InputIcon>{icon}</InputIcon>
      <InputAct
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeValue(e.currentTarget.value)
        }
      />
    </InputContainer>
  );
};

export default InputField;

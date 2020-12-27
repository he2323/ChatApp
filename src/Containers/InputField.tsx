import { InputContainer } from "../Styles";

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
      <div>{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeValue(e.target.value)
        }
      />
      <button type="button" onClick={() => console.log(`${placeholder}: ${value}`)}>log</button>
    </InputContainer>
  );
};

export default InputField;

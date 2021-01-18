import { registerItemT } from "../Components/App";
import { MainLogin, LoginImg, Forms, LoginLabel, LoginButton } from "../Styles";
import InputField from "./InputField";

interface RegisterI {
  registerItems: registerItemT[];
  toLogin: (status: boolean) => void;
  register: () => void;
}

const Register = ({
  registerItems,
  toLogin,
  register,
}: RegisterI): JSX.Element => {
  return (
    <MainLogin>
      <LoginImg />
      <Forms>
        <LoginLabel>Member Register</LoginLabel>
        {registerItems.map((item: registerItemT, index: number) => (
          <InputField
            key={index}
            icon={item.icon}
            type={item.type}
            placeholder={item.placeholder}
            value={item.value}
            changeValue={item.changeFun}
          />
        ))}
        <LoginButton type={"LoginButton"} onClick={() => register()}>
          Register
        </LoginButton>
        <div>
          Have account?
          <div onClick={() => toLogin(true)}>try to log in</div>
        </div>
      </Forms>
    </MainLogin>
  );
};

export default Register;

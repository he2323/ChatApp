import { MainLogin, LoginImg, Forms, LoginLabel, LoginButton } from "../Styles";
import InputField from "./InputField";
import { HiMail, HiLockClosed } from "react-icons/hi";
interface LoginI {
  mail: string;
  password: string;
  toRegister: () => void;
  changeLogin: (value: string) => void;
  changePassword: (value: string) => void;
  logIn: () => void;
}

const Login = ({
  toRegister,
  changePassword,
  changeLogin,
  logIn,
  mail,
  password,
}: LoginI): JSX.Element => {
  return (
    <MainLogin>
      <LoginImg></LoginImg>
      <Forms>
        <LoginLabel>Member Login</LoginLabel>
        <InputField
          icon={<HiMail />}
          type={"email"}
          placeholder={"mail"}
          value={mail}
          changeValue={(value: string): void => changeLogin(value)}
        />
        <InputField
          icon={<HiLockClosed />}
          type={"password"}
          placeholder={"password"}
          value={password}
          changeValue={changePassword}
        />
        <LoginButton type={"LoginButton"} onClick={() => logIn()}>
          logIn
        </LoginButton>
        <div onClick={() => toRegister()}>Sign Up</div>
      </Forms>
    </MainLogin>
  );
};

export default Login;

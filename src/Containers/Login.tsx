import { MainLogin, LoginImg, Forms, LoginLabel, LoginButton } from "../Styles";
import InputField from "./InputField";
import { HiMail, HiLockClosed } from "react-icons/hi";
interface LoginI {
  mail: string;
  password: string;
  toRegister: () => void;
  changeMail: (value: string) => void;
  changePassword: (value: string) => void;
  logIn: () => void;
}

const Login = ({
  toRegister,
  changePassword,
  changeMail,
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
          changeValue={(value: string): void => changeMail(value)}
        />
        <InputField
          icon={<HiLockClosed />}
          type={"password"}
          placeholder={"password"}
          value={password}
          changeValue={changePassword}
        />
        <LoginButton type={"LoginButton"} onClick={() => logIn()}>
          Login
        </LoginButton>
        <div>
          No account?
          <div onClick={() => toRegister()}>Sign Up</div>
        </div>
      </Forms>
    </MainLogin>
  );
};

export default Login;

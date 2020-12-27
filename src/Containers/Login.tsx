import { MainLogin, LoginImg, LoginForm, LoginLabel } from "../Styles";
import InputField from "./InputField";
import { HiMail, HiLockClosed } from "react-icons/hi";
interface LoginI {
  mail: string;
  password: string;
  toRegister: () => void;
  changeLogin: (value: string) => void;
  changePassword: (value: string) => void;


}

const Login = ({
  toRegister,
  changePassword,
  mail,
  changeLogin,
  password,
}: LoginI): JSX.Element => {
  return (
    <MainLogin>
      <LoginImg></LoginImg>
      <LoginForm>
        <form action="/login" method="post">
          <LoginLabel>Member Login</LoginLabel>
          <InputField
            icon={<HiMail />}
            type={"text"}
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
        </form>
        <div onClick = {()=>toRegister()}>Sign Up</div>
      </LoginForm>
    </MainLogin>
  );
};

export default Login;

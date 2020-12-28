import { MainLogin, LoginImg, Forms, LoginLabel, LoginButton } from "../Styles";
import InputField from "./InputField";
import { HiMail, HiLockClosed } from "react-icons/hi";

interface RegisterI {
  mail: string;
  password: string;
  name: string;
  nickname: string;
  image_link: string;
  toLogin: () => void;
  changeMail: (value: string) => void;
  changePassword: (value: string) => void;
  changeName: (value: string) => void;
  changeNickname: (value: string) => void;
  changeImage_link: (value: string) => void;
  register: () => void;
}

const Register = ({
  mail,
  password,
  name,
  nickname,
  image_link,
  toLogin,
  changeMail,
  changePassword,
  changeName,
  changeNickname,
  changeImage_link,
  register,
}: RegisterI): JSX.Element => {
  return (
    <MainLogin>
      <LoginImg></LoginImg>
      <Forms>
        <LoginLabel>Member Register</LoginLabel>
        <InputField
          icon={<HiLockClosed />}
          type={"text"}
          placeholder={"name"}
          value={name}
          changeValue={changeName}
        />
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
        <InputField
          icon={<HiLockClosed />}
          type={"text"}
          placeholder={"nickname"}
          value={nickname}
          changeValue={changeNickname}
        />
        <InputField
          icon={<HiLockClosed />}
          type={"text"}
          placeholder={"image_link"}
          value={image_link}
          changeValue={changeImage_link}
        />
        <LoginButton type={"LoginButton"} onClick={() => register()}>
          Register
        </LoginButton>
        <div>
          Have account?
          <div onClick={() => toLogin()}>try to log in</div>
        </div>
      </Forms>
    </MainLogin>
  );
};

export default Register;

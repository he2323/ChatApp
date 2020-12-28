import { MainLogin, LoginImg, Forms, LoginLabel, LoginButton } from "../Styles";

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
  register
}: RegisterI): JSX.Element => {
  return (
    <div>
      register
      <button onClick={() => toLogin()}>toLogin</button>
    </div>
  );
};

export default Register;

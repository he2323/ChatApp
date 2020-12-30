// eslint-disable-next-line
import { useState, useEffect } from "react";
import Chat from "./Containers/Chat";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Friends from "./Containers/Friends";
import { MainBody, MainApp } from "./Styles";
import { UserO } from "./Containers/Friends";
const App = () => {
  //data to store
  const [userLogged, setUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    _id: 0,
    user_email: "",
    user_password: "",
    user_name: "",
    user_nickname: "",
    user_image_link: "",
    user_friends_ids: [],
    user_groups_ids: [],
    user_privilege_level: 0,
    err: false,
  });
  const [userHaveAccount, setUserHaveAccount] = useState(true);
  const [mail, setMail] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [image_link, setImage_link] = useState("");
  const [privilege_level, setPrivilege_level] = useState(1); // (0- guest, 1- user, 3-admin) base 1, couse its for normal registration, still no guest login, and admin is speciall hcanging only in database
  //basic navigation
  const toLogin = (): void => setUserHaveAccount(true);
  const toRegister = (): void => setUserHaveAccount(false);
  //user info
  const changeMail = (value: string): void => setMail(value);
  const changePassword = (value: string): void => setPassword(value);
  const changeName = (value: string): void => setName(value);
  const changeNickname = (value: string): void => setNickname(value);
  const changeImage_link = (value: string): void => setImage_link(value);

  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setUserLogged(false);

  const registerUser = () => {
    fetch(
      `/register/${mail}/${password}/${name}/${nickname}/${image_link}>/${privilege_level}`,
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.res === true) {
          console.log("udało się utworzyć użytkownia");
          toLogin();
        } else {
          console.log("nie udało się utworzyć użytkownia");
        }
      });
  };

  const logIn = () => {
    if (mail.length > 0 && password.length > 0) {
      fetch(`/login/${mail}/${password}`, { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          if (data.err === false) {
            setLoggedUser(data);
            setUserLogged(true);
          } else {
            console.log(data);
            alert("bad pass or mail");
          }
        });
    } else alert("to short");
  };

  return (
    <MainBody>
      {userLogged ? (
        <MainApp>
          <Friends
            _id={loggedUser._id}
            user_email={loggedUser.user_email}
            user_password={loggedUser.user_password}
            user_name={loggedUser.user_name}
            user_nickname={loggedUser.user_nickname}
            user_image_link={loggedUser.user_image_link}
            user_friends_ids={loggedUser.user_friends_ids}
            user_groups_ids={loggedUser.user_groups_ids}
            user_privilege_level={loggedUser.user_privilege_level}
            err={loggedUser.err}
          ></Friends>
          <Chat logOut={logOut}></Chat>
        </MainApp>
      ) : userHaveAccount ? (
        <Login
          mail={mail}
          password={password}
          changeMail={(value: string) => changeMail(value)}
          changePassword={(value: string) => changePassword(value)}
          toRegister={toRegister}
          logIn={logIn}
        ></Login>
      ) : (
        <Register
          mail={mail}
          password={password}
          name={name}
          nickname={nickname}
          image_link={image_link}
          register={() => registerUser()}
          toLogin={toLogin}
          changeMail={(value: string) => changeMail(value)}
          changePassword={(value: string) => changePassword(value)}
          changeName={(value: string) => changeName(value)}
          changeNickname={(value: string) => changeNickname(value)}
          changeImage_link={(value: string) => changeImage_link(value)}
        ></Register>
      )}
    </MainBody>
  );
};

export default App;

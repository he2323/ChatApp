// eslint-disable-next-line
import { useState, useEffect } from "react";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Friends from "./Components/Friends";
import { MainBody, MainApp } from "./Styles";

const App = () => {
  //data to store
  const [userLogged, setUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({ user_friends_ids: [] });
  const [userHaveAccount, setUserHaveAccount] = useState(true);
  const [userFriends, setUserFriends] = useState([]);
  const [mail, setMail] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [image_link, setImage_link] = useState("");
  const [privilege_level, setPrivilege_level] = useState(1); // (0- guest, 1- user, 3-admin) base 1, couse its for normal registration, still no guest login, and admin is speciall hcanging only in database
  const [selectedUser, setSelectedUser] = useState(1); //store selected user id
  //basic navigation
  const toLogin = (): void => setUserHaveAccount(true);
  const toRegister = (): void => setUserHaveAccount(false);
  //user info
  const changeMail = (value: string): void => setMail(value);
  const changePassword = (value: string): void => setPassword(value);
  const changeName = (value: string): void => setName(value);
  const changeNickname = (value: string): void => setNickname(value);
  const changeImage_link = (value: string): void => setImage_link(value);

  const changeUserStatus = (id: number) =>
    fetch(`/status_change`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
  const logOut = () => {
    changeUserStatus(loggedUser._id);
    selectUser(1);
    setUserLogged(false);
  };

  const registerUser = async () => {
    const datas = {
      mail: mail,
      password: password,
      name: name,
      nickname: nickname,
      image_link: image_link,
      privilege_level: privilege_level,
    };
    const response = await fetch(`/register`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify(datas),
    });
    const data = await response.json();
    if (data.res) {
      console.log("udało się utworzyć użytkownia");
      toLogin();
    } else {
      console.log("nie udało się utworzyć użytkownia");
    }
  };

  const logIn = async () => {
    if (mail.length > 0 && password.length > 0) {
      const datas = { mail: mail, password: password };
      const response = await fetch(`/login`, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify(datas),
      });
      const data = await response.json();
      if (data.err === false) {
        setLoggedUser(data);
        setUserLogged(true);
        changeUserStatus(data._id);
      } else {
        alert("bad pass or mail");
      }
    } else alert("to short");
  };
  const deleteUser = (id: number) => {
    fetch(`/deleteUser`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(updateUser);
  };
  const updateUser = () => {
    fetch(`/user_info`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: loggedUser._id }),
    })
      .then((res) => res.json())
      .then((data) => setLoggedUser(data));
  };
  const selectUser = (id: number) => {
    setSelectedUser(id);
  };

  const setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return logOut();
    });
  };

  useEffect(() => {
    setupBeforeUnloadListener();
  }, [userLogged]);
  return (
    <MainBody>
      {userLogged ? (
        <MainApp>
          <Friends
            user_friends={loggedUser.user_friends_ids}
            user_privilege_level={loggedUser.user_privilege_level}
            delete_user={deleteUser}
            selectUser={selectUser}
          ></Friends>
          <Chat
            logOut={logOut}
            selectedUser={selectedUser}
            loggedUserId={loggedUser._id}
          ></Chat>
        </MainApp>
      ) : userHaveAccount ? (
        <Login
          mail={mail}
          password={password}
          changeMail={changeMail}
          changePassword={changePassword}
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
          register={registerUser}
          toLogin={toLogin}
          changeMail={changeMail}
          changePassword={changePassword}
          changeName={changeName}
          changeNickname={changeNickname}
          changeImage_link={changeImage_link}
        ></Register>
      )}
    </MainBody>
  );
};

export default App;

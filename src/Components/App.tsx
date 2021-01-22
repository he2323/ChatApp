// eslint-disable-next-line
import { useState, useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import Chat from "./Chat";
import Login from "../Containers/Login";
import Register from "../Containers/Register";
import Logged from "./Logged";
import { MainBody, MainApp } from "../Styles";
import { HiMail, HiLockClosed } from "react-icons/hi";

export type registerItemT = {
  icon: any;
  type: string;
  placeholder: string;
  value: string;
  changeFun: () => void;
};

const App = () => {
  //data to store
  const [tmp, setTmp] = useState("")
  const [userLogged, setUserLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [userHaveAccount, setUserHaveAccount] = useState(true);
  const [mail, setMail] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [image_link, setImage_link] = useState("");
  const [selectedMode, setSelectedMode] = useState("startingPage");
  // eslint-disable-next-line
  const [privilege_level, setPrivilege_level] = useState(1); // (0- guest, 1- user, 3-admin) base 1, couse its for normal registration, still no guest login, and admin is speciall hcanging only in database
  const [selectedElement, setSelectedElement] = useState({
    id: 0,
    type: "start",
  }); //store selected user id
  //basic navigation
  const [registerItems, setRegisterItems] = useState();

  useEffect(() => {
    setRegisterItems([
      {
        icon: <HiLockClosed />,
        type: "text",
        placeholder: "name",
        value: name,
        changeFun: setName,
      },
      {
        icon: <HiMail />,
        type: "email",
        placeholder: "mail",
        value: mail,
        changeFun: setMail,
      },
      {
        icon: <HiLockClosed />,
        type: "password",
        placeholder: "password",
        value: password,
        changeFun: setPassword,
      },
      {
        icon: <HiLockClosed />,
        type: "text",
        placeholder: "nickname",
        value: nickname,
        changeFun: setNickname,
      },
      {
        icon: <HiLockClosed />,
        type: "text",
        placeholder: "image link",
        value: image_link,
        changeFun: setImage_link,
      },
    ]);
  }, [name, mail, password, nickname, image_link]);

  const toRegister = (): void => setUserHaveAccount(false);
const tmpState = () => setTmp(tmp+"1");
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
    setSelectedElement(1);
    setUserLogged(false);
    setLoggedUser({});
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
      setUserHaveAccount(true);
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
  // eslint-disable-next-line
  const deleteUser = (id: number) => {
    fetch(`/deleteUser`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(updateUser);
  };
  const updateUser = async () => {
    const response = await fetch(`/user_info`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: loggedUser._id }),
    });
    const data = await response.json();
    await setLoggedUser(data);
    return data.status;
  };

  useBeforeunload(() => {
    if (userLogged) {
      const status = updateUser();
      console.log(loggedUser);
      if (status) {
        changeUserStatus(loggedUser._id);
        return "You'll lose your data!";
      }
    } else return;
  });
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     console.log("every 5 sec");
  //     console.log(Date.now());
  //     console.log(selectedElement);
  //     setSelectedElement(selectedElement)
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [selectedElement])
  return (
    <MainBody>
      {userLogged ? (
        <MainApp>
          <Logged
            loggedUserId={loggedUser._id}
            user_friends={loggedUser.friends_ids}
            selectedMode={selectedMode}
            selectElement={setSelectedElement}
            selectMode={setSelectedMode}
          />
          <Chat
            loggedUSer={loggedUser}
            updateUser={updateUser}
            logOut={logOut}
            selectedElement={selectedElement}
            loggedUserId={loggedUser._id}
          />
        </MainApp>
      ) : userHaveAccount ? (
        <Login
          mail={mail}
          password={password}
          changeMail={setMail}
          changePassword={setPassword}
          toRegister={toRegister}
          logIn={logIn}
        ></Login>
      ) : (
        <Register
          registerItems={registerItems}
          register={registerUser}
          toLogin={setUserHaveAccount}
        ></Register>
      )}
      <button onClick={() => console.log(selectedElement)}>log</button>
    </MainBody>
  );
};

export default App;

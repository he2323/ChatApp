// eslint-disable-next-line
import { useState, useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useIdle } from "react-use";
import Chat from "./Chat";
import InitialOperation from "../Containers/InitialOperation";

import Logged from "./UserPanel";
import { MainBody, MainApp } from "../Styles";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { useInterval } from "react-use";

export type InitialOperationItemT = {
  icon: any;
  type: string;
  placeholder: string;
  value: string;
  changeFun: () => void;
};
export type loggedUSerT = {
  err: boolean;
  _id: number;
  status: boolean;
  email: string;
  friends_ids: number[];
  image_link: string;
  name: string;
  password: string;
  privilage_level: number;
}
const App = () => {
  const isIdle = useIdle(5000);
  //data to store
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
  });
  const [registerItems, setRegisterItems] = useState([]);
  const [loginItems, setLoginItems] = useState([]);
  useEffect(() => {
    setLoginItems([
      {
        icon: <HiMail />,
        type: "text",
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
    ]);
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

  const changeUserStatus = (id: number, status: boolean) =>
    fetch(`/status_change`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: id, status: status }),
    });
  const logOut = () => {
    changeUserStatus(loggedUser._id, false);
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
      const data: loggedUSerT = await response.json();
      if (data.err === false) {
        setLoggedUser(data);
        setUserLogged(true);
        changeUserStatus(data._id, true);
      } else {
        alert("bad pass or mail");
      }
    } else alert("to short");
  };
  // const deleteUser = (id: number) => {
  //   fetch(`/deleteUser`, {
  //     method: "POST",
  //     headers: {
  //       content_type: "application/json",
  //     },
  //     body: JSON.stringify({ id: id }),
  //   }).then(updateUser);
  // };
  const updateUser = async () => {
    const response = await fetch(`/user_info`, {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ id: loggedUser._id }),
    });
    const data: loggedUSerT = await response.json();
    setLoggedUser(data);
    return data.status;
  };

  useInterval(
    () => {
      if (loggedUser._id) {
        if (isIdle && loggedUser.status) {
          changeUserStatus(loggedUser._id, false);
          updateUser();
        } else {
          if (!loggedUser.status) changeUserStatus(loggedUser._id, true);
          updateUser();
        }
      }
    },
    loggedUser ? 5000 : null
  );
  useBeforeunload(() => {
    if (userLogged) {
      const status = updateUser();
      console.log(loggedUser);
      if (status) {
        changeUserStatus(loggedUser._id, false);
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
        <InitialOperation
          items={loginItems}
          text={"login"}
          changedestinationFunc={() => setUserHaveAccount(false)}
          func={logIn}
        />
      ) : (
        <InitialOperation
          items={registerItems}
          text={"register"}
          changedestinationFunc={() => setUserHaveAccount(true)}
          func={registerUser}
        />
      )}
    </MainBody>
  );
};

export default App;

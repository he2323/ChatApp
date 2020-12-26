// eslint-disable-next-line
import { useState, useEffect } from "react";
import Chat from "./Containers/Chat";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Friends from "./Containers/Friends";
import { MainBody, MainApp } from "./Styles";

const App = () => {
  const [userLogged, setUserLogged] = useState(true);
  const [userHaveAccount, setUserHaveAccount] = useState(true);
  const toLogin = () => setUserHaveAccount(true);
  const toRegister = () => setUserHaveAccount(false);

  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUserLogged(false);
  };
  return (
    <MainBody>
      {userLogged ? (
        <MainApp>
          <Friends></Friends>
          <Chat logOut={logOut}></Chat>
        </MainApp>
      ) : userHaveAccount ? (
        <Login toRegister={toRegister}></Login>
      ) : (
        <Register toLogin={toLogin}></Register>
      )}
    </MainBody>
  );
};

export default App;
/*
users:
  user_id, email, password, name, surname, nickname, 
msg:
  msg_id, sender_id, receiver_id, msg_text, send_date
*/
// const [currentTime, setCurrentTime] = useState("");
// const [counter, setCounter] = useState(0);

// const fetchCounter = () => {
//   fetch("/getCounter")
//     .then((res) => res.json())
//     .then((data) => {
//       setCounter(data.counter);
//     });
// };
// useEffect(() => {
//   fetch("/time")
//     .then((res) => res.json())
//     .then((data) => {
//       setCurrentTime(data.time);
//     });
//   fetchCounter();
// }, []);

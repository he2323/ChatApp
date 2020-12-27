// eslint-disable-next-line
import { useState, useEffect } from "react";
import Chat from "./Containers/Chat";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Friends from "./Containers/Friends";
import { MainBody, MainApp } from "./Styles";

const App = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [userHaveAccount, setUserHaveAccount] = useState(true);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const toLogin = (): void => setUserHaveAccount(true);
  const toRegister = (): void => setUserHaveAccount(false);
  const changeMail = (value: string): void => setMail(value);
  const changePassword = (value: string): void => setPassword(value);

  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setUserLogged(false);
  const logIn = () => {
    if (mail.length > 0 && password.length > 0) {
      fetch(`/login/${mail}/${password}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.err === true) {
            alert("bad pass or mail");
          } else {
            console.log(data);
          }
        });
    } else alert("to short");
  };
  return (
    <MainBody>
      {userLogged ? (
        <MainApp>
          <Friends></Friends>
          <Chat logOut={logOut}></Chat>
        </MainApp>
      ) : userHaveAccount ? (
        <Login
          changeLogin={(value: string) => changeMail(value)}
          mail={mail}
          changePassword={(value: string) => changePassword(value)}
          password={password}
          toRegister={toRegister}
          logIn={logIn}
        ></Login>
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

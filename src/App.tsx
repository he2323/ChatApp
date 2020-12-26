// eslint-disable-next-line
import { useState, useEffect } from "react";
import styled from "styled-components";
import Chat from "./Containers/Chat";
import Friends from "./Containers/Friends";
import img from "./images/cosmic.jpg";
const MainBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${img});
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const MainApp = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  height: 90%;
`;



const App = (): JSX.Element => {
  return (
    <MainBody>
      <MainApp>
        <Friends></Friends>
        <Chat></Chat>
      </MainApp>
    </MainBody>
  );
};

export default App;
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

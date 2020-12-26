// eslint-disable-next-line
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Containers/Chat";
import Login from "./Containers/Login";
import Register from "./Containers/Register";

import Friends from "./Containers/Friends";
import { MainBody, MainApp } from "./Styles";

const App = () => {
  return (
    <div>
      <Router>
        <MainBody>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </MainBody>
      </Router>
    </div>
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

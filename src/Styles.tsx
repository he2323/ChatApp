import styled from "styled-components";
import MainBackground from "./images/cosmic.jpg";
import loginImg from "./images/loginImg.png";

export const MainBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${MainBackground});
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
export const MainApp = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  height: 90%;
`;

export const ChatMain = styled.div`
  width: calc(75vw * 0.9);
  height: 100%;
  background-color: brown;
`;
export const ChoosenPerson = styled.div`
  width: 100%;
  height: 10%;
  background-color: grey;
  box-shadow: 0px 2px cadetblue;
  margin-bottom: 2px;
`;
export const ActualChat = styled.div`
  width: 100%;
  min-height: 80%;
  max-height: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
export const Message = styled.div`
  width: 75%;
  max-width: 75%;
  height: auto;
  margin-top: 2px;
  margin-bottom: 2px;
  text-align: ${(props: any) => (props.loggedUser ? "right" : "left")};
  background-color: ${(props: any) =>
    props.loggedUser ? "lightblue" : "lightgrey"};
  margin-${(props: any) => (props.loggedUser ? "left" : "right")}: 25%;
`;
export const MsgHandle = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
`;
export const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(25vw * 0.9);
  height: 100%;
  background-color: lime;
`;
export const GroupChoose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  width calc(15vw*0.9);
  height: 5%;
  background-color: white;

`;
export const SearchBar = styled.div`
  width calc(15vw*0.9);
  height: 5%;
  border-radius: 20px;
  background-color: red;
`;

export const Person = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width calc(18vw*0.9);
  height: 10%;
  min-height: 10%;
  background-color: aqua;
  margin: 1px;
`;
export const Constacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width calc(19vw*0.9);
  height: 90%;
  margin-top: 5px;
  max-height: 90%;
  overflow-y: ${(props: any) => (props.big ? "scroll" : "hidden")};
  overflow-x: hidden;
`;
//Login
export const MainLogin = styled.div`
  display: flex;
  flex-wrap: wrap
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
`;
export const LoginImg = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${loginImg});
  background-repeat: no-repeat;
  border-radius: 70px;
`;
export const Forms = styled.div`
  margin: 0 auto;
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LoginLabel = styled.label`
  font-size: 40px;
  font-weight: bolder;
  color: white;
`;
export const InputContainer = styled.div`
  background-color: lightgrey;
  border-radius: 70px;
  width: 15rem;
  height: 3.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
`;
export const InputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 100%;
`;
export const InputAct = styled.input`
  background-color: lightgrey;
  border: none;
  height: 3rem;
  &:focus {
    outline: none;
  }
`;
export const LoginButton = styled.button`
  width: 10rem;
  height: 3rem;
  border-radius: 70px;
  background-color: lime;
  border: none;
`;

export const FriendImage = styled.img`
border-radius: 75px;
margin-left: 5%;
height:75%;
`
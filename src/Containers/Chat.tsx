import styled from "styled-components";

const ChatMain = styled.div`
  width: calc(80vw * 0.9);
  height: 100%;
  background-color: brown;
`;
const ChoosenPerson = styled.div`
  width: 100%;
  height: 10%;
  background-color: grey;
  box-shadow: 0px 2px cadetblue;
  margin-bottom: 2px;
`;
const ActualChat = styled.div`
  width: 100%;
  min-height: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const Message = styled.div`
  width: 75%;
  max-width: 75%;
  height: auto;
  background-color: ${(props: any) =>
    props.loggedUser ? "lightblue" : "lightgrey"};
  margin-${(props: any) => (props.loggedUser ? "left" : "right")}: 25%;
`;
const MsgHandle = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
`;
const Chat = () => {
    return (
        <ChatMain>
          <ChoosenPerson></ChoosenPerson>
          <ActualChat>
            <Message loggedUser={0}>somerandom text shit</Message>
            <Message loggedUser={1}>somerandom text shit</Message>
            <Message loggedUser={0}>somerandom text shit</Message>
            <Message loggedUser={1}>somerandom text shit</Message>
            <Message loggedUser={1}>somerandom text shit</Message>
            <Message loggedUser={0}>somerandom text shit</Message>
            <Message loggedUser={1}>somerandom text shit</Message>
          </ActualChat>
          <MsgHandle></MsgHandle>
        </ChatMain>
    )
}

export default Chat

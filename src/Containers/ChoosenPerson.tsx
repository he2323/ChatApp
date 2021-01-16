import { ChoosenPerson as PersonDiv, FriendImage } from "../Styles";


interface choosenI{
    user_name: string;
    user_image: string;
    logOut: ()=>any;
}
const ChoosenPerson = ({logOut,user_name,user_image}: choosenI) => {
  return <PersonDiv>
      <button onClick={logOut}>logOut</button>
      <div>{user_name}</div>
      <FriendImage src={user_image}  alt="friend image"/>
  </PersonDiv>;
};

export default ChoosenPerson;

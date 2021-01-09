import { ChoosenPerson as PersonDiv } from "../Styles";


interface choosenI{
    user_name: string;
    user_image: string;
    logOut: ()=>any;
}
const ChoosenPerson = ({logOut,user_name,user_image}: choosenI) => {
  return <PersonDiv>
      <button onClick={logOut}>logOut</button>
      <div>{user_name}</div>
      <div>{user_image}</div>
  </PersonDiv>;
};

export default ChoosenPerson;

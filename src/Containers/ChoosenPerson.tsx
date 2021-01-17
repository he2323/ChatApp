import { ChoosenPerson as PersonDiv, FriendImage } from "../Styles";

export interface ChoosenI {
  name: string;
  image: string;
  logOut: () => any;
}
const ChoosenPerson = ({ logOut, name, image }: ChoosenI) => {
  return (
    <PersonDiv>
      <button onClick={logOut}>logOut</button>
      <div>{name}</div>
      <FriendImage src={image} alt="friend image" />
    </PersonDiv>
  );
};

export default ChoosenPerson;

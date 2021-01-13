import { Person, FriendImage } from "../Styles";
export interface FrienI {
  id: number;
  name: string;
  image: string;
  selectUser: (id: number) => any;
}
const Friend = ({id, name, image, selectUser }: FrienI) => {

  return (
    <Person onClick={() => selectUser(id)}>
      <FriendImage src={image} alt="friend image"/>
      {name}
    </Person>
  );
};
export default Friend;

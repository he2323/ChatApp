import { Person, FriendImage } from "../Styles";
import { GoPrimitiveDot } from "react-icons/go";
import { IconContext } from "react-icons";
import { SelElementI } from "../Components/Logged";
export interface FrienI {
  id: number;
  name: string;
  image: string;
  status: boolean;
  type: "friend" | "chat";
  selectUser: ({ id, type }: SelElementI) => any;
}
export const Friend = ({ id, name, image, status, type, selectUser }: FrienI) => {
  return (
    <Person onLoad={()=>console.log(`${type} of name: ${name} has id of: ${id}`)} onClick={() => selectUser({ id: id, type: type })}>
      <FriendImage src={image} alt="friend image" />
      <div>{name}</div>
      <IconContext.Provider value={{ color: "darkgreen" }}>
        {status ? <GoPrimitiveDot /> : null}
      </IconContext.Provider>
    </Person>
  );
};

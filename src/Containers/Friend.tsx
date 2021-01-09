import { Person, FriendImage } from "../Styles";
import { useState, useEffect } from "react";
interface FrienI {
  friend_id: number;
  priv_lvl: number;
  delete_user: (id: number) => Promise<Response>;
}
const Friend = ({ friend_id, priv_lvl, delete_user }: FrienI) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`/friend_info/${friend_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(Date.now());
        setUser(data);
      });
  }, []);
  return (
    <Person>
      <FriendImage src={user.user_image_link} alt="friend image" />
      {user.user_name}
      {priv_lvl === 3 && user._id !== 1 ? (
        <button onClick={() => {delete_user(friend_id);console.log("del");}}>
          del user {user.user_name}
        </button>
      ) : null}
    </Person>
  );
};
export default Friend;

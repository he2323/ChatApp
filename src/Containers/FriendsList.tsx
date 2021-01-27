import {Friend} from "./Friend"
import { ElementI, SelElementI } from "../Components/UserPanel";

interface FriendsListI{
    friends_data: ElementI[];
    loggedUserId: number;
    selectUser: ({id, type}:SelElementI) => void;
}

const FriendsList = ({friends_data, loggedUserId, selectUser}:FriendsListI) => {
  return (
    <>
      {friends_data.map((friend: ElementI) =>
        friend.id !== loggedUserId ? (
          <Friend
            id={friend.id}
            name={friend.name}
            image={friend.img_link}
            status={friend.status}
            selectUser={selectUser}
            key={friend.id}
            type={"friend"}
            typeMng = {"friendMng"}
          />
        ) : null
      )}
    </>
  );
};

export default FriendsList;

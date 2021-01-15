import {Friend} from "./Friend"
import { ElementI, SelElementI } from "./Logged";

interface FriendsListI{
    friends_data: ElementI[];
    loggedUserId: number;
    selectUser: ({id, type}:SelElementI) => any;
}

const FriendsList = ({friends_data, loggedUserId, selectUser}:FriendsListI) => {
  return (
    <>
      {friends_data.map((friend: ElementI) =>
        friend.id !== loggedUserId ? (
          <Friend
            id={friend.id}
            name={friend.name}
            image={friend.image_link}
            status={friend.status}
            selectUser={selectUser}
            key={friend.id}
          />
        ) : null
      )}
    </>
  );
};

export default FriendsList;

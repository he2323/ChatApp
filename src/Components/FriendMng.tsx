import * as React from "react";
import { FriendOptions, FriendButton } from "../Styles";
import { SelElementI } from "./Logged";

interface FriendMngI {
  selectedElement: SelElementI;
  loggedUser: number;
}

const FriendMng = ({ selectedElement, loggedUser }: FriendMngI) => {
  const addToFriends = async (loggedUserId: number, friendId: number) => {
    console.log(`loggedUserId: ${loggedUserId}, friendId: ${friendId}`);
    const response = await fetch("/add_friend", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ loggedUserId: loggedUserId, selectedUserId: friendId }),
    });
    const data = await response.json();
    console.log(data.error);
    if (data.error === true) {
      alert(`we can't add this user to your friends for some reason`);
    }
  };
  return (
    <FriendOptions>
      <FriendButton
        onClick={() => addToFriends(loggedUser, selectedElement.id)}
      >
        Add user to friends
      </FriendButton>
    </FriendOptions>
  );
};

export default FriendMng;

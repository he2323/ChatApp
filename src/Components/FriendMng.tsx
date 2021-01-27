import { useState } from "react";
import { FriendOptions, FriendButton } from "../Styles";
import { loggedUSerT } from "./App";
import { SelElementI } from "./UserPanel";

interface FriendMngI {
  selectedElement: SelElementI;
  loggedUser: loggedUSerT;
  updateUser: () => void;
}

const FriendMng = ({ selectedElement, loggedUser, updateUser }: FriendMngI) => {
  const addToFriends = async (loggedUserId: number, friendId: number) => {
    console.log(`loggedUserId: ${loggedUserId}, friendId: ${friendId}`);
    const response = await fetch("/add_friend", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        loggedUserId: loggedUserId,
        selectedUserId: friendId,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.error === true) {
      alert(`we can't add this user to your friends for some reason`);
    } else {
      await createChat(loggedUserId, friendId);
      // updateUser();
    }
  };
  const deleteFromFriends = async (loggedUserId: number, friendId: number) => {
    console.log(`loggedUserId: ${loggedUserId}, friendId: ${friendId}`);
    const response = await fetch("/delete_friend", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        loggedUserId: loggedUserId,
        selectedUserId: friendId,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.error) {
      alert(`we can't delete this user from your friends for some reason`);
    } else {
      updateUser();
    }
  };
  const createChat = async (loggedUserId: number, friendId: number) => {
    console.log("creating chat....");
    console.log(`loggedUserId: ${loggedUserId}, friendId: ${friendId}`);
    const response = await fetch("/create_chat", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        loggedUserId: loggedUserId,
        selectedUserId: friendId,
      }),
    });
    const data = await response.json();
    if (!data.error) {
      alert(`we can't delete this user from your friends for some reason`);
    } else {
      updateUser();
    }
  };
  return (
    <FriendOptions>
      {!loggedUser.friends_ids.includes(selectedElement.id) ? (
        <FriendButton
          onClick={() => addToFriends(loggedUser._id, selectedElement.id)}
        >
          Add user to friends
        </FriendButton>
      ) : null}
      {loggedUser.friends_ids.includes(selectedElement.id) ? (
        <FriendButton
          onClick={() => deleteFromFriends(loggedUser._id, selectedElement.id)}
        >
          remove user from friends
        </FriendButton>
      ) : null}
      <FriendButton
        onClick={() => createChat(loggedUser._id, selectedElement.id)}
      >
        Create chat with your friend
      </FriendButton>
    </FriendOptions>
  );
};

export default FriendMng;

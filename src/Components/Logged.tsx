import React from "react";
import { Friend } from "../Containers/Friend";
import { ContactsList, ModeSelect, SearchBar, Constacts } from "../Styles";
import { useState, useEffect } from "react";
import FriendsList from "../Containers/FriendsList";
import ChatList from "../Containers/ChatList";
export interface SelElementI {
  id: number;
  type: "friend" | "chat" | "start";
}
export interface UserO {
  user_friends: number[];
  loggedUserId: number;
  selectedMode: string;
  selectElement: ({ id, type }: SelElementI) => any;
  selectMode: (mode: string) => any;
}
export interface ElementI {
  id: number;
  name: string;
  image_link: string;
  status: boolean;
}

const Logged = ({
  user_friends,
  loggedUserId,
  selectedMode,
  selectMode,
  selectElement,
}: UserO) => {
  const [user_friends_data_list, setUser_friends_data_list] = useState([]);
  const [user_chat_data_list, setuser_chat_data_list] = useState([]);
  const [options, setOptions] = useState([
    { label: "Start", value: "startingPage" },
    { label: "Friends", value: "friends" },
    { label: "Chats", value: "chats" },
  ]);
  useEffect(() => {
    const fetchUserFriendsData = async () => {
      const response = await fetch(`/friends_info`, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({ ids: user_friends }),
      });
      const data = await response.json();

      await setUser_friends_data_list(data.list);
    };
    const fetchUserChatsData = async () => {
      const response = await fetch(`/chats`, {
        method: "POST",
        headers: {
          content_type: "application/json",
        },
        body: JSON.stringify({ id: loggedUserId }),
      });
      const data = await response.json();

      await setuser_chat_data_list(data.list);
    };
    if (user_friends.length > 0) fetchUserFriendsData();
    fetchUserChatsData();
  }, [user_friends]);

  return (
    <ContactsList>
      <ModeSelect
        defaultValue={selectedMode}
        onChange={(event: any) => {
          selectMode(event.currentTarget.value);
          if (event.currentTarget.value === "startingPage")
            selectElement({ id: 0, type: "start" });
        }}
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ModeSelect>
      <SearchBar></SearchBar>
      <Constacts big={user_friends.length > 10 ? 1 : 0}>
        {selectedMode === "friends" ? (
          <FriendsList
            friends_data={user_friends_data_list}
            loggedUserId={loggedUserId}
            selectUser={selectElement}
          />
        ) : selectedMode === "chats" ? (
          <ChatList
            chats_data={user_chat_data_list}
            loggedUserId={loggedUserId}
            selectChat={selectElement}
          />
        ) : (
          "Greeting on chat app!"
        )}
      </Constacts>
    </ContactsList>
  );
};

export default Logged;

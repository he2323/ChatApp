import React from "react";
import Friend from "./Friend";
import { ContactsList, ModeSelect, SearchBar, Constacts } from "../Styles";
import { useState, useEffect } from "react";
export interface UserO {
  user_friends: number[];
  user_privilege_level: number;
  selectUser: (id: number) => any;
  delete_user: (id: number) => any;
}
interface FriendI {
  id: number;
  name: string;
  image_link: string;
}

const Friends = ({ user_friends, selectUser }: UserO) => {
  const [user_friends_data_list, setUser_friends_data_list] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [user_friends]);
  return (
    <ContactsList>
      <ModeSelect></ModeSelect>
      <SearchBar></SearchBar>
      <Constacts big={user_friends.length > 10 ? 1 : 0}>
        {user_friends_data_list.map((friend: FriendI) => {
          return (
            <Friend
              id={friend.id}
              name={friend.name}
              image={friend.image_link}
              selectUser={selectUser}
              key={friend.id}
            />
          );
        })}
      </Constacts>
    </ContactsList>
  );
};

export default Friends;

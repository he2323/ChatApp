import React from "react";
import { useState, useEffect } from "react";
import Friend from "./Friend";
import {
  ContactsList,
  GroupChoose,
  SearchBar,
  Constacts,
  Person,
} from "../Styles";
export interface UserO {
  user_friends: number[];

  user_privilege_level: number;

  delete_user: (id: number) => any;
}

const Friends = ({
  user_friends,
  user_privilege_level,
  delete_user,
}: UserO) => {
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>
      <button onClick={() => console.log(user_friends)}>Friends</button>
      <Constacts big={user_friends.length > 10 ? 1 : 0}>
        {user_friends.map((friend: any) => {
          return (
            <Friend
              friend_id={friend}
              delete_user={delete_user}
              key={friend}
              priv_lvl={user_privilege_level}
            />
          );
        })}
      </Constacts>
    </ContactsList>
  );
};

export default Friends;

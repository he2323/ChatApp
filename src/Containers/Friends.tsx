import userEvent from "@testing-library/user-event";
import { useState, useEffect } from "react";
import {
  ContactsList,
  GroupChoose,
  SearchBar,
  Constacts,
  Person,
} from "../Styles";
export interface UserO {
  _id: number;
  user_email: string;
  user_password: string;
  user_name: string;
  user_nickname: string;
  user_image_link: string;
  user_friends: UserI[];
  user_groups_ids: number[];
  user_privilege_level: number;
  err: Boolean;
  delete_user: (id: number) => Promise<Response>;
}
interface UserI {
  _id: number;
  user_email: string;
  user_password: string;
  user_name: string;
  user_nickname: string;
  user_image_link: string;
  user_friends: UserI[];
  user_groups_ids: number[];
  user_privilege_level: number;
  err: Boolean;
}
const Friends = ({
  _id,
  user_email,
  user_password,
  user_name,
  user_nickname,
  user_image_link,
  user_friends,
  user_groups_ids,
  user_privilege_level,
  err,
  delete_user,
}: UserO) => {
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>

      <Constacts big={user_friends.length > 10 ? 1 : 0}>
        {user_friends.map((friend) => {
          return (
            <Person key={friend}>
              {friend._id}
              {user_privilege_level === 3 && _id !== 1 ? (
                <button onClick={() => delete_user(_id)}>
                  del user {user_name}
                </button>
              ) : null}
            </Person>
          );
        })}
      </Constacts>
    </ContactsList>
  );
};

export default Friends;

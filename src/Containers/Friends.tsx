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
  user_friends_ids: number[];
  user_groups_ids: number[];
  user_privilege_level: number;
  err: Boolean;
  delete_user: (id: number) => Promise<Response>;
}

const Friends = ({
  _id,
  user_email,
  user_password,
  user_name,
  user_nickname,
  user_image_link,
  user_friends_ids,
  user_groups_ids,
  user_privilege_level,
  err,
  delete_user,
}: UserO) => {
  // eslint-disable-next-line
  const [friends, setFriends] = useState([...user_friends_ids]);
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>

      <Constacts big={friends.length > 10 ? 1 : 0}>
        {friends.map((friend: number, key: number) => {
          return (
            <Person key={key}>
              {friend}
              {user_privilege_level === 3 ? (
                <button onClick={() => delete_user(friend)}>del user {friend}</button>
              ) : null}
            </Person>
          );
        })}
      </Constacts>
    </ContactsList>
  );
};

export default Friends;

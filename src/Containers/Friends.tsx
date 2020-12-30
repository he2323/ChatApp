import userEvent from "@testing-library/user-event";
import { Dispatch, useState } from "react";
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
}: UserO) => {
  // eslint-disable-next-line
  const [friends, setFriends] = useState([...user_friends_ids]);
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>
      <button onClick={() => console.log(_id)}>log</button>
      <Constacts big={friends.length > 10 ? 1 : 0}>
        {friends.map((friend: object, key: number) => {
          return <Person key={key}>{user_name}</Person>;
        })}
      </Constacts>
    </ContactsList>
  );
};

export default Friends;

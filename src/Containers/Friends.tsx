import { useState } from "react";
import {
  ContactsList,
  GroupChoose,
  SearchBar,
  Constacts,
  Person,
} from "../Styles";

const Friends = () => {
  // eslint-disable-next-line
  const [friends, setFriends] = useState([]);
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>
      <Constacts big={friends.length > 10 ? 1 : 0}>
        {friends.map((friend: object, key: number) => {
          return (
            <Person key={key}>
              <div>{key}some </div>
              <div>shing</div>
              <div>some text </div>
            </Person>
          );
        })}
      </Constacts>
    </ContactsList>
  );
};

export default Friends;

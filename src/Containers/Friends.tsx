import { useState } from "react";
import {ContactsList, GroupChoose, SearchBar, Constacts, Person} from "../Styles"

const Friends = () => {
    const [friends, setFriends] = useState([1,3,2,42,234,1,123,123,456,54,2]);
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>
      <Constacts big={friends.length > 10 ? 1 : 0}>
        {friends.map((person: object, key: number) => {
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

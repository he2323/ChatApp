import { useState } from "react";
import {ContactsList, GroupChoose, SearchBar, Constacts, Person} from "../Styles"

const Friends = () => {
    const [persons, setPersons] = useState([]);
  return (
    <ContactsList>
      <GroupChoose></GroupChoose>
      <SearchBar></SearchBar>
      <Constacts big={persons.length > 10 ? 1 : 0}>
        {persons.map((person: object, key: number) => {
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

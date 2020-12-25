import { useState } from "react";
import styled from "styled-components";

const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(20vw * 0.9);
  height: 100%;
  background-color: lime;
`;
const GroupChoose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  width calc(15vw*0.9);
  height: 5%;
  background-color: white;

`;
const SearchBar = styled.div`
  width calc(15vw*0.9);
  height: 5%;
  border-radius: 20px;
  background-color: red;
`;

const Person = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width calc(18vw*0.9);
  height: 10%;
  min-height: 10%;
  background-color: aqua;
  margin: 1px;
`;
const Constacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width calc(19vw*0.9);
  height: 90%;
  margin-top: 5px;
  max-height: 90%;
  overflow-y: ${(props: any) => (props.big ? "scroll" : "hidden")};
  overflow-x: hidden;
`;
const Friends = () => {
    const [persons, setPersons] = useState([
        1,
        1,
        1,
        1,
        1,
        1,
        11,
        1,
        11,
        1,
        1,
        1,
        1,
        1,
      ]);
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

import {
  ContactsList,
  ModeSelect,
  SearchBar,
  Constacts,
  SearchBox,
  CrossDel,
  ModeOption,
  SearchUsers,
} from "../Styles";
import { useState, useEffect } from "react";
import FriendsList from "../Containers/FriendsList";
import ChatList from "../Containers/ChatList";
import { ImCross } from "react-icons/im";
export interface SelElementI {
  id: number;
  type: "friend" | "chat" | "start" | "friendMng" | "chatMng";
}
export interface UserO {
  user_friends: number[];
  loggedUserId: number;
  selectedMode: string;
  selectElement: ({ id, type }: SelElementI) => void;
  selectMode: (mode: string) => void;
}
export interface ElementI {
  id: number;
  name: string;
  img_link: string;
  status: boolean;
}
type OptionT = {
  label: string;
  value: string | number;
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
  // eslint-disable-next-line
  const [options, setOptions] = useState([
    { label: "Start", value: "startingPage" },
    { label: "Friends", value: "friends" },
    { label: "Chats", value: "chats" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [similarUsers, setSimilarUsers] = useState([]);
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
  }, [user_friends, loggedUserId]);
  const get_users = async () => {
    const response = await fetch("/search_user", {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({ text: searchText }),
    });
    const data = await response.json();
    await setSimilarUsers(data.list);
  };
  useEffect(() => {
    if (searchText) {
      get_users();
    }
  }, [searchText]);
  return (
    <ContactsList>
      <ModeSelect
        defaultValue={selectedMode}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          selectMode(event.currentTarget.value);
          if (event.currentTarget.value === "startingPage")
            selectElement({ id: 0, type: "start" });
        }}
      >
        {options.map((option: OptionT) => (
          <ModeOption key={option.value} value={option.value}>
            {option.label}
          </ModeOption>
        ))}
      </ModeSelect>
      <SearchBox>
        <SearchBar
          type="text"
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.currentTarget.value)}
          placeholder="Search.."
          onKeyUp={get_users}
        />
        <CrossDel onClick={() => setSearchText("")}>
          <ImCross />
        </CrossDel>
      </SearchBox>
      {searchText ? (
        <SearchUsers onClick={() => setSearchText("")}>
          <FriendsList
            friends_data={similarUsers}
            loggedUserId={loggedUserId}
            selectUser={selectElement}
          />
        </SearchUsers>
      ) : null}
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

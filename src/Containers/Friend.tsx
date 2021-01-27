import { Person, FriendImage } from "../Styles";
import { GoPrimitiveDot } from "react-icons/go";
import { GrUserSettings, GrSettingsOption } from "react-icons/gr";
import { IconContext } from "react-icons";
import { SelElementI } from "../Components/UserPanel";
export interface FrienI {
  id: number;
  name: string;
  image: string;
  status: boolean;
  type: "friend" | "chat";
  typeMng: "friendMng" | "chatMng";
  selectUser: ({ id, type }: SelElementI) => void;
}
export const Friend = ({
  id,
  name,
  image,
  status,
  type,
  typeMng,
  selectUser,
}: FrienI) => {
  return (
    <Person>
      <FriendImage
        src={image}
        alt={type === "chat" ? "chat Image" : "friend image"}
        onClick={() => {
          selectUser({ id: id, type: type });
          console.log(type);
        }}
      />
      <div
        style={{ height: "100%", display: "flex", alignItems: "center" }}
        onClick={() => {
          selectUser({ id: id, type: type });
          console.log(type);
        }}
      >
        {name}
      </div>

      <IconContext.Provider value={{ color: "darkgreen" }}>
        {status ? <GoPrimitiveDot /> : null}
      </IconContext.Provider>
      <button
        onClick={() => {
          console.log(typeMng);
          selectUser({ id: id, type: typeMng });
        }}
      >
        {typeMng === "friendMng" ? <GrUserSettings /> : <GrSettingsOption />}
      </button>
    </Person>
  );
};

import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__user">
          <img src={avatar} alt="User avatar" className="sidebar__avatar" />
          <h2 className="sidebar__name">Terrence Tegegne</h2>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

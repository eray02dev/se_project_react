import "./SideBar.css";

export default function SideBar({ onEditProfile, onLogout, currentUser }) {
  const name = currentUser?.name || "New User";
  const avatar = currentUser?.avatar || "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {avatar ? (
          <img src={avatar} alt={name} className="sidebar__avatar" />
        ) : (
          <div className="sidebar__avatar sidebar__avatar--placeholder">
            {name[0]?.toUpperCase() || "U"}
          </div>
        )}
        <p className="sidebar__name">{name}</p>
      </div>

      <button className="sidebar__link" type="button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__link" type="button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

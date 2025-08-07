import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import avatar from "../../assets/avatar.png";

function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__user">
          <img src={avatar} alt="User avatar" className="profile__avatar" />
          <h2 className="profile__name">Terrence Tegegne</h2>
        </div>

        <div className="profile__main">
          <div className="profile__top">
            <h3 className="profile__items-title">Your items</h3>
            <button className="profile__add-btn" onClick={onAddClick}>
              + Add new
            </button>
          </div>

          <ul className="profile__cards">
            {clothingItems.map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;

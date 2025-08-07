import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import avatar from "../../assets/avatar.png";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <div className="profile">
      <div className="profile__container">
        <SideBar />
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

          <ClothesSection
            clothingItems={clothingItems}
            onCardClick={onCardClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

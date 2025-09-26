// src/components/Profile/Profile.jsx
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onLogout,
  currentUser,
  onCardLike, // 🆕
  isLoggedIn, // 🆕
}) {
  const myItems = currentUser
    ? clothingItems.filter((c) => String(c.owner) === String(currentUser._id))
    : [];

  return (
    <section className="profile">
      <SideBar
        onEditProfile={onEditProfile}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      <div className="profile__content">
        <div className="profile__top">
          <h3 className="profile__items-title">Your items</h3>
          <button className="profile__add-btn" onClick={onAddClick}>
            + Add new
          </button>
        </div>

        <ClothesSection
          clothingItems={myItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike} // 🆕 geçir
          isLoggedIn={isLoggedIn} // 🆕 geçir
          currentUser={currentUser} // 🆕 geçir
        />
      </div>
    </section>
  );
}

export default Profile;

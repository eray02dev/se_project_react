import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike, // 🆕
  isLoggedIn, // 🆕
  currentUser, // 🆕
}) {
  return (
    <ul className="profile__cards cards__list">
      {clothingItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike} // 🆕 kalp için gerekli
          isLoggedIn={isLoggedIn} // 🆕 sadece login ise göster
          currentUser={currentUser} // 🆕 like durumunu hesaplamak için
        />
      ))}
    </ul>
  );
}

export default ClothesSection;

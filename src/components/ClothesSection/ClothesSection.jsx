import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <ul className="profile__cards">
      {clothingItems.map((item) => (
        <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
      ))}
    </ul>
  );
}

export default ClothesSection;

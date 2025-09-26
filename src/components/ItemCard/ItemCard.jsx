import "./ItemCard.css";

function ItemCard({
  item,
  onCardClick,
  onCardLike,
  isLoggedIn,
  currentUser,
  onRequireAuth, // (opsiyonel) tıklayınca login modalı açtırmak için
}) {
  const userId = currentUser?._id;
  const isLiked =
    !!userId &&
    Array.isArray(item.likes) &&
    item.likes.some((id) => String(id) === String(userId));

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      // sadece görünür olsun, tıklayınca login iste
      onRequireAuth?.();
      return;
    }
    onCardLike?.({ id: item._id, isLiked });
  };

  const src = item.link || item.imageUrl || "";
  const alt = item.name || "clothing item";
  const likeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card" onClick={() => onCardClick?.(item)}>
      <div className="card__top">
        <span className="card__name">{item.name}</span>

        {/* ✅ her zaman göster; logout iken disabled */}
        <button
          type="button"
          className={likeButtonClassName}
          onClick={handleLike}
          disabled={!isLoggedIn}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Remove like" : "Add like"}
          title={!isLoggedIn ? "Log in to like items" : ""}
        >
          <svg
            viewBox="0 0 24 24"
            className="card__like-icon"
            aria-hidden="true"
          >
            <path d="M12 21s-6.716-4.363-9.173-6.82A5.5 5.5 0 1 1 11.3 6.707L12 7.4l.7-.692A5.5 5.5 0 1 1 21.173 14.18C18.716 16.637 12 21 12 21z" />
          </svg>
        </button>
      </div>

      <img className="card__image" src={src} alt={alt} loading="lazy" />
    </li>
  );
}

export default ItemCard;

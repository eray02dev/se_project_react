import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  // 🆕 Sprint 14 props:
  onCardLike,
  isLoggedIn,
  currentUser,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp?.[currentTemperatureUnit];

  const visibleItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {temperature} &deg; {currentTemperatureUnit} / You may want
          to wear:
        </p>

        <ul className="cards__list">
          {visibleItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              // 🆕 Sprint 14:
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

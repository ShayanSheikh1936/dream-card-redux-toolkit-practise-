import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../slices/carsSlice';

function Favorites() {
  const { favorites = [] } = useSelector(state => state.cars);
  const dispatch = useDispatch();

  if (!favorites.length) {
    return <div className="favorites-page"><h2>Favorites</h2><p>No favorite cars yet. Go add some!</p></div>;
  }

  return (
    <div className="favorites-page">
      <h2>Your Favorite Cars</h2>
      <div className="car-list">
        {favorites.map(car => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} className="car-img" />
            <div className="car-info">
              <h3>{car.brand} {car.name}</h3>
              <p>{car.model} • {car.year}</p>
              <p>${car.price.toLocaleString()}</p>
              <button onClick={() => dispatch(removeFavorite(car.id))}>
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

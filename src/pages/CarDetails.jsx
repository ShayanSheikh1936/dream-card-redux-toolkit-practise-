import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../slices/carsSlice';

function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cars, status } = useSelector((state) => state.cars);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCars());
  }, [dispatch, status]);

  useEffect(() => {
    setCar(cars.find(c => String(c.id) === String(id)));
  }, [cars, id]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div className="car-details-page">
      <Link to="/cars" className="back-link">← Back to Cars</Link>
      <div className="car-details">
        <img src={car.image} alt={car.name} className="car-details-img" />
        <div className="car-details-info">
          <h2>{car.brand} {car.name}</h2>
          <p><b>Model:</b> {car.model}</p>
          <p><b>Type:</b> {car.type}</p>
          <p><b>Price:</b> ${car.price.toLocaleString()}</p>
          <p><b>Year:</b> {car.year}</p>
          <p className="description">{car.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;

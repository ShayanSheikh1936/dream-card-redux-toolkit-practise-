import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, setFilters, addFavorite, removeFavorite } from '../slices/carsSlice';
import { Link } from 'react-router-dom';

function CarList() {
  const dispatch = useDispatch();
  const { cars, favorites = [], status, filters } = useSelector((state) => state.cars);
  const [search, setSearch] = useState(filters.search);
  const [brand, setBrand] = useState(filters.brand);
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [type, setType] = useState(filters.type);
  const [sortBy, setSortBy] = useState(filters.sortBy);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCars());
  }, [dispatch, status]);

  useEffect(() => {
    let filtered = [...cars];
    if (brand) {
      filtered = filtered.filter(car => car.brand === brand);
    }
    if (type) {
      filtered = filtered.filter(car => car.type === type);
    }
    filtered = filtered.filter(car =>
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );
    if (search) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year_asc') {
      filtered.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'year_desc') {
      filtered.sort((a, b) => b.year - a.year);
    }
    dispatch(setFilters({
      brand, priceRange, type, search, sortBy
    }));
    setFiltered(filtered);
    // eslint-disable-next-line
  }, [cars, brand, priceRange, type, search, sortBy]);

  const [filtered, setFiltered] = useState([]);

  // Extract unique brands & types
  const brands = Array.from(new Set(cars.map(car => car.brand)));
  const types = Array.from(new Set(cars.map(car => car.type)));

  return (
    <div className="car-list-page">
      <h2>All Cars</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <label>
          Price:
          <input
            type="range"
            min="0"
            max="600000"
            step="1000"
            value={priceRange[1]}
            onChange={e => setPriceRange([0, +e.target.value])}
          />
          <span>${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
        </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="price_asc">Price (Low → High)</option>
          <option value="price_desc">Price (High → Low)</option>
          <option value="year_asc">Year (Oldest first)</option>
          <option value="year_desc">Year (Newest first)</option>
        </select>
      </div>
      <div style={{fontWeight:'bold',marginBottom:10}}>{filtered.length} car(s) found</div>
      {status === 'loading' ? <p>Loading...</p> : (
        <div className="car-list">
          {filtered.length === 0 ? <p>No cars found.</p> : (
            filtered.map(car => {
              const isFav = favorites.some(f => f.id === car.id);
              return (
                <div key={car.id} className="car-card">
                  <img src={car.image} alt={car.name} className="car-img" />
                  <div className="car-info">
                    <h3>{car.brand} {car.name}</h3>
                    <p>{car.model} • {car.year}</p>
                    <p>${car.price.toLocaleString()}</p>
                    {!isFav && <button onClick={() => dispatch(addFavorite(car.id))}>Add to Favorites</button>}
                    {isFav && <button onClick={() => dispatch(removeFavorite(car.id))}>Remove from Favorites</button>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default CarList;

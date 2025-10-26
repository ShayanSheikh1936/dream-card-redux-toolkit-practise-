import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carsData from '../data/cars.json';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    // Simulate network request delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(carsData);
      }, 1000);
    });
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    filteredCars: [],
    status: 'idle',
    error: null,
    filters: {
      brand: '',
      priceRange: [0, 100000],
      type: '',
      search: '',
      sortBy: 'price_asc',
    },
    favorites: [],
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addFavorite: (state, action) => {
      const car = state.cars.find(car => car.id === action.payload);
      if (car && !state.favorites.find(f => f.id === car.id)) {
        state.favorites.push(car);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(car => car.id !== action.payload);
    },
    // Filtering/sorting/searching to be implemented
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cars = action.payload;
        state.filteredCars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters, addFavorite, removeFavorite } = carsSlice.actions;
export default carsSlice.reducer;

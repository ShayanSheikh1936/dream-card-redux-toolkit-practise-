import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import CarList from './pages/CarList';
import About from './pages/About';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import ThemeToggle from './components/ThemeToggle';
import ThemeProvider from './components/ThemeProvider';
import './App.css';

const NAVS = [
  { key: 'home', label: 'Home' },
  { key: 'cars', label: 'Car List' },
  { key: 'favorites', label: 'Favorites' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' }
];

function App() {
  const [page, setPage] = useState('home');

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>Dream Car Gallery</h1>
            <ThemeToggle />
            <nav className="nav-bar">
              {NAVS.map(nav => (
                <button
                  key={nav.key}
                  onClick={() => setPage(nav.key)}
                  className={page === nav.key ? 'nav-active' : ''}
                >
                  {nav.label}
                </button>
              ))}
            </nav>
          </header>
          <main>
            {page === 'home' && <Home />}
            {page === 'cars' && <CarList />}
            {page === 'favorites' && <Favorites />}
            {page === 'about' && <About />}
            {page === 'contact' && <Contact />}
          </main>
          <footer className="app-footer">© 2025 Dream Car | All rights reserved. Developed by Shayan Sheikh</footer>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
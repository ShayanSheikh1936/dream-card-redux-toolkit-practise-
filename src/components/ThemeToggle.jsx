import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/uiSlice';

function ThemeToggle() {
  const theme = useSelector(state => state.ui.theme);
  const dispatch = useDispatch();
  return (
    <button
      className="theme-toggle"
      title="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
    </button>
  );
}

export default ThemeToggle;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const theme = useSelector(state => state.ui.theme);
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  return children;
}

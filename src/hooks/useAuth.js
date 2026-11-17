import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const readIsLoggedIn = () =>
  localStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('loginToken') === 'true';

// Single source of truth for login state. Reads localStorage (there's no
// backend session here) and re-checks on every route change, since login/
// logout happen via direct localStorage writes rather than React state.
export const useAuth = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(readIsLoggedIn);

  useEffect(() => {
    setIsLoggedIn(readIsLoggedIn());
  }, [location.key]);

  return isLoggedIn;
};

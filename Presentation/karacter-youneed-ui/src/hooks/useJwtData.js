import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const useJwtData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getTokenData = () => {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      if (!token) return null;

      try {
        const decoded = jwtDecode(token);
      console.log(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

        return {
          email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
          initials: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
            ?.split('@')[0]
            ?.slice(0, 2)
            ?.toUpperCase() || 'UN'
        };
      } catch (error) {
        console.error('Błąd dekodowania tokenu:', error);
        return null;
      }
    };

    setUserData(getTokenData());

  }, []);

  return userData;
}; 
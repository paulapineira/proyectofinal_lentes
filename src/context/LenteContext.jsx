import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const LenteContext = createContext();

const LenteProvider = ({ children }) => {
  const [lentes, setLentes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lentes');
        console.log('Lentes from API:', response.data); /*ocupe esto para verificar los datos que trae la API porque no me estaba trayendo nada*/
        setLentes(response.data);
      } catch (error) {
        console.error('Error fetching lentes:', error);
      }
    })();
  }, []);

  return (
    <LenteContext.Provider value={{ lentes: lentes }}>
      {children}
    </LenteContext.Provider>
  );
};

export default LenteProvider;





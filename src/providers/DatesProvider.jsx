import { useState, useEffect, createContext, useContext } from 'react';

export const DatesContext = createContext({
  dates: [],
  setDates: dates => {},
});

export const DatesProvider = ({ children }) => {
  // TODO: get initial value from URL
  const [dates, setDates] = useState([]);

  return (
    <DatesContext.Provider value={{ dates, setDates, timezone: 'Australia/Brisbane' }}>
      {children}
    </DatesContext.Provider>
  );
};

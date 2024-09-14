import React, { createContext, useContext, useState } from 'react';

const RegNumberContext = createContext();

export const useRegNumber = () => useContext(RegNumberContext);

export const RegNumberProvider = ({ children }) => {
  const [regNumber, setRegNumber] = useState('');

  return (
    <RegNumberContext.Provider value={{ regNumber, setRegNumber }}>
      {children}
    </RegNumberContext.Provider>
  );
};

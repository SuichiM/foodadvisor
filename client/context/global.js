// hook for global context

// Path: client/context/global.js

import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children, globalData: initialGlobalData }) => {
  const [globalData, setGlobalData] = useState(initialGlobalData);

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

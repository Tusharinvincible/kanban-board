import React, { useState } from 'react';
import StagesContext from './StagesContext';

const StagesContextProvider = ({ children }) => {
  const [stagesObject, setStagesObject] = useState({});

  return (
    <StagesContext.Provider value={{ stagesObject, setStagesObject }}>
      {children}
    </StagesContext.Provider>
  );
};

export default StagesContextProvider;
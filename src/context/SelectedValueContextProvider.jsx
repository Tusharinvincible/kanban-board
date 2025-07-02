import React, { useState } from 'react';
import SelectedValueContext from './SelectedValueContext';

const SelectedValueContextProvider = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SelectedValueContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </SelectedValueContext.Provider>
  );
};

export default SelectedValueContextProvider;
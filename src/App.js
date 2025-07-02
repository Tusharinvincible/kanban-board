import './App.css';
import React from "react";
import Controls from './components/Controls';
import StagesContextProvider from './context/StagesContextProvider';
import SelectedValueContextProvider from './context/SelectedValueContextProvider';

const App = () => {
  return ( 
    <div className="App">
      <StagesContextProvider>
        <SelectedValueContextProvider>
          <Controls />
        </SelectedValueContextProvider>
      </StagesContextProvider>
    </div>
  );
};
export default App;

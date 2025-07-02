import React, { useContext } from 'react';
import Stage from './Stage';
import StagesContext from '../context/StagesContext';
import SelectedValueContext from '../context/SelectedValueContext';

const Board = React.memo(({ stagesNames}) => {
  const {stagesObject} = useContext(StagesContext);
  const {selectedValue} = useContext(SelectedValueContext);
  console.log("selectedValue in board", selectedValue);
  console.log("stagesObject in board", stagesObject);
  return (
    <div className="board-container">
      <h1 className="board-title">Kanban Board</h1>
      <div className="stages-container">
        {Object.keys(stagesNames).map((stageName) => {
          return (
            <Stage 
              key={stageName}
              stageId={stagesNames[stageName]} 
              name={stageName} 
              tasks={stagesObject[stageName] || []} 
            />
          );
        })}
      </div>
    </div>
  );
});

export default Board;

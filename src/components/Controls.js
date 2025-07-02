import React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import Board from './Board';
import StagesContext from '../context/StagesContext';
import SelectedValueContext from '../context/SelectedValueContext';

const listStages = {
  "Backlog stage": 0,
  "To Do stage": 1,
  "Ongoing stage": 2,
  "Done Stage": 3
};

const listStagesArray = Object.keys(listStages);

const Controls = () => {
  const [inputValue, setInputValue] = useState('');
  // const [selectedValue, setSelectedValue] = useState('');
  const { stagesObject, setStagesObject } = useContext(StagesContext);
  const { selectedValue, setSelectedValue, value } = useContext(SelectedValueContext);
  // const [stagesObject, setStagesObject] = useState({});

  const handleCreateTask = useCallback(() => {
    if (!inputValue.trim()) return;
    
    setStagesObject(prevStages => {
      const newStages = { ...prevStages };
      const initialStage = "Backlog stage";
      
      if (!newStages[initialStage]) {
        newStages[initialStage] = [inputValue];
      } else {
        newStages[initialStage] = [...newStages[initialStage], inputValue];
      }
      
      return newStages;
    });
    
    setInputValue('');
  }, [inputValue]);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);


  const getCurrentStage = useCallback((task) => {
    if (!task) {
      return "";
    }
    
    for (const stage of listStagesArray) {
      if (stagesObject[stage] && stagesObject[stage].length > 0 && stagesObject[stage].includes(task)) {
        return stage;
      }
    }
    
    return "";
  }, [stagesObject]);

  const handleMoveForward = useCallback(() => {
    if (!selectedValue) {
      return;
    }
    
    const currentStage = getCurrentStage(selectedValue);
    
    if (!currentStage || Number(listStages[currentStage]) === listStagesArray.length - 1) {
      return;
    }
    
    const nextStage = listStagesArray[Number(listStages[currentStage]) + 1];
    
    setStagesObject(prevStages => {
      const newStages = { ...prevStages };
      
      if (newStages[currentStage]) {
        newStages[currentStage] = newStages[currentStage].filter(task => task !== selectedValue);
      }
      
      if (!newStages[nextStage]) {
        newStages[nextStage] = [selectedValue];
      } else {
        newStages[nextStage] = [...newStages[nextStage], selectedValue];
      }
      
      return newStages;
    });
  }, [selectedValue, getCurrentStage]);

  const handleMoveBack = useCallback(() => {
    if (!selectedValue) {
      return;
    }
    
    const currentStage = getCurrentStage(selectedValue);
    
    if (!currentStage || Number(listStages[currentStage]) === 0) {
      return;
    }
    
    const prevStage = listStagesArray[Number(listStages[currentStage]) - 1];
    
    setStagesObject((prevStages) => {
      const newStages = { ...prevStages };
      
      if (newStages[currentStage]) {
        newStages[currentStage] = newStages[currentStage].filter(task => task !== selectedValue);
      }
      
      if (!newStages[prevStage]) {
        newStages[prevStage] = [selectedValue];
      } else {
        newStages[prevStage] = [...newStages[prevStage], selectedValue];
      }
      
      return newStages;
    });
  }, [selectedValue, getCurrentStage]);

  const handleDelete = useCallback(() => {
    if (!selectedValue) {
      return;
    }
    
    const currentStage = getCurrentStage(selectedValue);
    
    if (!currentStage) {
      return;
    }
    
    setStagesObject(prevStages => {
      const newStages = { ...prevStages };
      
      if (newStages[currentStage]) {
        newStages[currentStage] = newStages[currentStage].filter(task => task !== selectedValue);
      }
      
      return newStages;
    });
    
    setSelectedValue('');
  }, [selectedValue, getCurrentStage]);
  console.log("render");
  console.log("stagesObject", stagesObject);
  console.log("selectedValue", selectedValue);
  return (
    <div className="controls-container">
      {/* <h1>value: {value}</h1> */}
      <h1 className="controls-title">Kanban Task Manager</h1>
      
      <div className="task-creation-section">
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          data-testid="new-task-name-input" 
          placeholder='New task name'
          className="task-input"
        />
        <button 
          disabled={inputValue.length === 0} 
          data-testid="create-task-btn"
          onClick={handleCreateTask}
          className="create-btn"
        >
          Create Task
        </button>
      </div>

      <div className="task-management-section">
        <input 
          readOnly={true} 
          value={selectedValue} 
          data-testid="selected-task-field" 
          placeholder='Selected task name' 
          className="selected-task-input"
        />
        <button
          data-testid="move-forward-btn"  
          onClick={handleMoveForward}
          className="action-btn move-forward"
          disabled={!selectedValue}
        >
          Move Forward
        </button>
        <button 
          data-testid="move-back-btn"  
          onClick={handleMoveBack}
          className="action-btn move-back"
          disabled={!selectedValue}
        >
          Move Back
        </button>
        <button 
          data-testid="delete-btn"  
          onClick={handleDelete}
          className="action-btn delete"
          disabled={!selectedValue}
        >
          Delete
        </button>
      </div>
      <Board stagesNames={listStages} />
    </div>
  );
};

export default Controls;

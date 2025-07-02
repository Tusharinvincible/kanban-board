import React, { useContext } from 'react';
import SelectedValueContext from '../context/SelectedValueContext';

const taskNameToId = name => {
  return `task-${name}`;
}

const Task = ({ name }) => {
  const {selectedValue, setSelectedValue } = useContext(SelectedValueContext);
  return (
    <div className="task-card" data-testid={taskNameToId(name)}>
      <button 
        className="task-button"
        data-testid="task-btn"
        onClick={() => {
          if (selectedValue === name) {
            setSelectedValue('');
          } else {
            setSelectedValue(name);
          }
        }}
      >
        {name}
      </button>
    </div>
  );
}

export default Task;

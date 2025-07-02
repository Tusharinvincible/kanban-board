import React from 'react';
import Task from './Task';

const Stage = React.memo(({ name, stageId, tasks }) => {
  return (
    <div className="stage-column" data-testid={`stage-${stageId}`}>
      <h2 className="stage-header">{name}</h2>
      <div className="stage-tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task  key={task} name={task} />
          ))
        ) : (
          <div className="empty-stage">No tasks yet</div>
        )}
      </div>
    </div>
  );
});

export default Stage;

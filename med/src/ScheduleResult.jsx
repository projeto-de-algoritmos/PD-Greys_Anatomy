// ScheduleResult.js
import React from 'react';

const ScheduleResult = ({ selectedTasks }) => (
  <div>
    <h2>Scheduled Tasks:</h2>
    <ul>
      {selectedTasks.map((task, index) => (
        <li key={index}>{`Task ${task.index + 1}: ${task.start} - ${task.end} (Weight: ${task.weight})`}</li>
      ))}
    </ul>
  </div>
);

export default ScheduleResult;

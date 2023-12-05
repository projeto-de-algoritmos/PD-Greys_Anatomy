// TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map((task, index) => (
      <li key={index}>{`Task ${index + 1}: ${task.start} - ${task.end} (Weight: ${task.weight})`}</li>
    ))}
  </ul>
);

export default TaskList;

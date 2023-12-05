import React, { useState } from 'react';
import './style/dashboard.css';
import med from './assets/blue_medical.mp4';

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map((task, index) => (
      <li key={index}>{`Task ${index + 1}: ${task.start} - ${task.end} (Weight: ${task.weight})`}</li>
    ))}
  </ul>
);

const ScheduleResult = ({ selectedTasks }) => (
  <div>
    <h2>Resultado:</h2>
    <ul>
      {selectedTasks.map((task, index) => (
        <li key={index}>{`Task ${task.index + 1}: ${task.start} - ${task.end} (Weight: ${task.weight})`}</li>
      ))}
    </ul>
  </div>
);

const Dashboard = () => {
  // array de tarefas
  const [tasks] = useState([
    { start: 0, end: 6, weight: 8 },
    { start: 1, end: 4, weight: 5 },
    { start: 3, end: 5, weight: 3 },
    { start: 3, end: 8, weight: 7 },
    { start: 5, end: 7, weight: 10 },
    { start: 8, end: 12, weight: 2 },
  ]);

  const weightIntervalScheduling = () => {
    // ordenando as terafs por fim e selecionando tarefas não sobrepostas
    const sortedTasks = tasks.sort((a, b) => a.end - b.end);
    const selectedTasks = [sortedTasks[0]];

    for (let i = 1; i < sortedTasks.length; i++) {
      if (sortedTasks[i].start >= selectedTasks[selectedTasks.length - 1].end) {
        selectedTasks.push(sortedTasks[i]);
      }
    }

    setScheduledTasks(selectedTasks);
  };

  const [scheduledTasks, setScheduledTasks] = useState([]);

  return (
    <div className="container">
          <h1>Algum Título</h1>
          <div className="videoTag">
            <video autoPlay loop muted>
              <source src={med} type='video/mp4' />
            </video>
            <div className="aplication-1">
              <h2>Agendamento</h2>
                <div className='options'>
                  <label htmlFor="petName">Médico Responsável:</label>
                  <input
                    className='form-field'
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="startTime">Nome do paciente:</label>
                  <input
                    className='form-field'
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="endTime">Nível de gravidade</label>
                  <select
                    placeholder='hora de fim'
                    className='form-field'
                    id="endTime"
                  >
                  </select>
                </div>
                <div>
                  <label htmlFor="endTime">Tempo estimado:</label>
                  <select
                    placeholder='hora de fim'
                    className='form-field'
                    id="endTime"
                  >
                  </select>
                </div>
            </div>
            <div className="aplication-2">
              <h2>Quadro de Cirurgias</h2>
                <TaskList tasks={tasks} />
                <button onClick={weightIntervalScheduling}>Calcular tarefas</button>
                <ScheduleResult selectedTasks={scheduledTasks} />
            </div>
          </div>
        </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import './style/dashboard.css';
import med from './assets/blue_medical.mp4';
import { intervalScheduling, find_Solution, tarefasPegadas} from './TaskList';

const Dashboard = () => {
  const [userIntervals, setUserIntervals] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [medicoName, setMedicoName] = useState('');
  const [patientName, setPatientName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = parseInt(e.target.elements.start.value);
    const end = parseInt(e.target.elements.end.value);
    const weight = parseInt(e.target.elements.weight.value);

    if (!isNaN(start) && !isNaN(end) && !isNaN(weight)) {
      const newInterval = {
        start,
        end,
        weight,
        medico: medicoName,
        paciente: patientName,

      };

      setUserIntervals((prevIntervals) => [...prevIntervals, newInterval]);

      e.target.reset();

    } else {
      console.error('Por favor, preencha todos os campos do formulário corretamente.');
    }
  };
  const runAlgorithm = () => {

    intervalScheduling(userIntervals);
    find_Solution(userIntervals.length);

    setSelectedTasks([...tarefasPegadas]);
  };

  return (
    <div className="container">
      <h1>Algum Título</h1>
      <div className="videoTag">
        <video autoPlay loop muted>
          <source src={med} type='video/mp4' />
        </video>
        <div className="aplication-1">
          <form onSubmit={handleSubmit}>
            <h2>Adicionar Intervalo</h2>
            <div className='options'>
              <label htmlFor="medName">Médico Responsável:</label>
              <select
                className='form-field'
                id="medName"
                name="medName"
                value={medicoName}
                onChange={(e) => setMedicoName(e.target.value)}
              >
                <option value="">Selecione um médico</option>
                <option value="Meredith Grey">Meredith Grey</option>
                <option value="Alex Karev">Alex Karev</option>
                <option value="Miranda Bailey">Miranda Bailey</option>
                <option value="Derek Shepherd">Derek Shepherd</option>
                <option value="Cristina Yang">Cristina Yang</option>
              </select>
            </div>
            <div className='options'>
              <label htmlFor="patientName">Nome do paciente:</label>
              <input
                className='form-field'
                type="text"
                id="patientName"
                name="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            {/* <div className='options'>
              <label htmlFor="start">Início:</label>
              <input
                className='form-field'
                type="text"
                id="start"
                name="start"
              />
            </div>
            <div className='options'>
              <label htmlFor="end">Fim:</label>
              <input
                className='form-field'
                type="text"
                id="end"
                name="end"
              />
            </div> */}
            <div className='options'>
              <label htmlFor="start">Hora de início:</label>
              <select
                className='form-field'
                id="start"
                name="start"
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00h</option>
                ))}
              </select>
            </div>

            <div className='options'>
              <label htmlFor="end">Hora de fim:</label>
              <select
                className='form-field'
                id="end"
                name="end"
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00h</option>
                ))}
              </select>
            </div>
            <div className='options'>
              <label htmlFor="weight">Gravidade:</label>
              <select
                className='form-field'
                id="weight"
                name="weight"
              >
                {[...Array(11).keys()].map((value) => (
                  <option key={value * 10} value={value * 10}>
                    {value * 10}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className='options'>
              <label htmlFor="weight">Gravidade:</label>
              <input
                className='form-field'
                type="text"
                id="weight"
                name="weight"
              />
            </div> */}
            <button type="submit">Adicionar Intervalo</button>
            <button onClick={runAlgorithm}>Executar Algoritmo</button>
          </form>

          {/* Exibição dos intervalos inseridos */}
          <div>
            <h2>Intervalos Inseridos: {medicoName} </h2>
            <ul>
              {userIntervals.map((interval, index) => (
                <li key={index}>
                  Início: {interval.start}, Fim: {interval.end}, Gravidade: {interval.weight}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="aplication-2">
          <h2>Quadro de Cirurgias</h2>
          <p>Selected Tasks:</p>
          <ul>
            {selectedTasks.map((task, index) => (
              <li key={index}>
                Médico: {task.medico},<br /> Paciente:{task.paciente},<br /> Início: {task.start}:00, Fim: {task.end}:00, Gravidade: {task.weight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
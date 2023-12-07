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
      <h1>GreyMed Scheduler: Foco em Emergências</h1>
      <div className="videoTag">
        <video autoPlay loop muted>
          <source src={med} type='video/mp4' />
        </video>
        <div className="aplication-1">
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="patientName">Paciente:</label>
              <input
                className='form-input'
                placeholder='Nome do Paciente'
                type="text"
                id="patientName"
                name="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
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
            <button className='add-button' type="submit">+ adicionar</button>
          </form>
          <div className='result-1'>
            <h3>Lista:</h3>
            <ul>
              {userIntervals.map((interval, index) => (
                <li key={index}>
                  Início: {interval.start}, Fim: {interval.end}, Gravidade: {interval.weight}
                </li>
              ))}
            </ul>
          </div>
          <button className='submit-button' onClick={runAlgorithm}>Verificar&nbsp;&gt;&gt;</button>
        </div>
        <div className="aplication-2">
          <h2>Quadro de Atendimentos</h2>
          <div className='result-2'>
            <ul>
              {selectedTasks.map((task, index) => (
                <li key={index}>
                  <b>Médico</b>: {task.medico} <br /> <b>Paciente:</b> {task.paciente},<br /> <b>Início: {task.start}:00&rarr;Fim: {task.end}:00&rarr;Gravidade: {task.weight}</b>
                </li>
              ))}
            </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
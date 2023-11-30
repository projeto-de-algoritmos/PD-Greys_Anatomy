import './style/dashboard.css';
import med from './assets/blue_medical.mp4';


function Dashboard() {

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
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
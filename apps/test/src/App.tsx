
import './App.css'
import { Hermes } from 'hermes_fe';


function App() {
  const hermes = new Hermes('hermes-id');
  hermes.init();


  return (
    <>
      
      <h4 style={{position: 'absolute', top:0, left: 0}} data-hermes-id="title">Vite</h4>

      <div className='hermes-panel' data-hermes-id="panel">
        HHH
      </div>
      
    </>
  )
}

export default App

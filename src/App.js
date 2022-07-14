import './App.css'
import Login from './components/Login'
import { useState } from 'react'

const App = () => {

  const [ id, setId ] = useState()

  return (
    <div className="App">
      {id}
     <Login onIdSubmit={setId}/>
    </div>
  );
}

export default App;

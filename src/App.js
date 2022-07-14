import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/localStorage'

const App = () => {

  const [ id, setId ] = useLocalStorage('id')

  return (
    <div className="App">

      {id ? <Dashboard id={id}/> : <Login onIdSubmit={setId}/> }
      
    </div>
  );
}

export default App;

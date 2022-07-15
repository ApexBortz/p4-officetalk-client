import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/useLocalStorage'
// import { ContactProvider } from './contexts/ContactProvider'

const App = () => {

  const [ id, setId ] = useLocalStorage('id')

  // const dashboardFunction = () => {
  //     <ContactProvider>
  //       <Dashboard id={id} />
  //     </ContactProvider>
  // }

  return (
    <div className="App">

      <img src='/officetalk_5.png' alt='Officetalk' style={{ width: '30%' }} className='MainLogo'/>

      { id ? <Dashboard id={id}/> : <Login onIdSubmit={setId}/> }
      
    </div>
  );
}

export default App;

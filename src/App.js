import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/useLocalStorage'
import { ContactProvider } from './contexts/ContactProvider'
import { ConversationProvider } from './contexts/ConversationProvider'

const App = () => {

  // local storage of user id/username
  const [ id, setId ] = useLocalStorage('id')

  // dashboard function to provide both contexts & render dashboard
  const dashboardFunction = () => {
    return(
      <ContactProvider>
        <ConversationProvider id={id} >
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactProvider>
    )
  }

  return (
    <div className='App'>

      { id ? dashboardFunction() : <Login onIdSubmit={setId}/> }
      
    </div>
  );
}

export default App;

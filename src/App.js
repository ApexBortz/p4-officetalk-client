import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/useLocalStorage'
import { ContactProvider } from './contexts/ContactProvider'
import { ConversationProvider } from './contexts/ConversationProvider'
import { SocketConnection } from './contexts/SocketConnection'

const App = () => {

  // local storage of user id/username
  const [ id, setId ] = useLocalStorage('id')

  // dashboard function to pass in contexts and socket connection
  const dashboardFunction = () => {
    return(
      // provides socket connection
      // provides contacts from context
      // provides conversations from context
      // renders dashboard
      <SocketConnection id={id}>
        <ContactProvider>
          <ConversationProvider id={id} >
            <Dashboard id={id} />
          </ConversationProvider>
        </ContactProvider>
      </SocketConnection>

    )
  }

  // ternary to render login if no id - rest of app if id
  return (
    <div className='App'>

      { id ? dashboardFunction() : <Login onIdSubmit={setId}/> }
      
    </div>
  );
}

export default App;

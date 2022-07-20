import React from 'react'
import { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

// context provider for making new contact and list of contacts
export function ContactProvider({ children }) {

    // list of contacts from local storage
    const [ contacts, setContacts ] = useLocalStorage('contacts', [])

    // create new contact function
    function createContact(id, name) {
        setContacts(prevContacts => {
            return [ ...prevContacts, { id, name }]
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }} >
            { children }
        </ContactsContext.Provider>
    )
}


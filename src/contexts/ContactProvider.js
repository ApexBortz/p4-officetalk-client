import React from 'react'
import { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactProvider({ children }) {

    const [ contacts, setContacts ] = useLocalStorage('contacts', [])

    const createContact = (id, name) => {
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

import React from 'react'
import { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactProvider'

const ConversationContext = React.createContext()

export function useConversations() {
    return useContext(ConversationContext)
}

// context provider for making new conversation and showing list of convos
export function ConversationProvider({ children }) {

    // our convos from localstorage
    const [ conversations, setConversations ] = useLocalStorage('conversations', [])

    const { contacts } = useContacts()

    // creating new conversation
    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [ ...prevConversations, { recipients, messages: [] }]
        })
    }

    // convo formatter to pass it into context provider easier
    // const formattedConvos = conversations.map(conversation => {
    //     const recipients = conversation.recipients.map(recipient => {
    //         const contact = contacts.find(contact => {
    //             return contact.id === recipient
    //         })
    //         const name = (contact && contact.name) || recipient
    //         return { id: recipient, name }
    //     })
    //     return { ...conversation, recipients }
    // })

    // make formattedconvos & createconvo value so we can just pass 'value' into the context provider
    // const value = {
    //     conversations: formattedConvos,
    //     createConversation
    // }

    return (
        <ConversationContext.Provider value={{ conversations, createConversation }} >
            { children }
        </ConversationContext.Provider>
    )
}


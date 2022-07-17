import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
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

    const [ selectedConversationIndex, setSelectedConversationIndex ] = useState(0)

    // extracting out contacts from context provider
    const { contacts } = useContacts()

    // creating new conversation
    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [ ...prevConversations, { recipients, messages: [] }]
        })
    }

    // conversation formatter mapping through & selecter
    const formattedConvos = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })
        const selected = index === selectedConversationIndex
        return { ...conversation, recipients, selected }
    })

    // 
    const providerValue = {
        conversations: formattedConvos,
        selectedConversation : formattedConvos[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationContext.Provider value={providerValue} >
            { children }
        </ConversationContext.Provider>
    )
}


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
export function ConversationProvider({ id, children }) {

    // our convos from localstorage
    const [ conversations, setConversations ] = useLocalStorage('conversations', [])

    // useState for selected conversation & for selecting a different one
    const [ selectedConversationIndex, setSelectedConversationIndex ] = useState(0)

    // extracting contacts from context provider
    const { contacts } = useContacts()

    // create new conversation function
    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [ ...prevConversations, { recipients, messages: [] }]
        })
    }

    // the actual function that adds message to the conversation
    function addMessage({ recipients, text, sender }) {
        setConversations(prevConversations => {
            // madeChange to check if new message sent to conversation
            let madeChange = false
            // newmessage variable with sender and text passed in
            const newMessage = { sender, text }

            const newConversations = prevConversations.map(conversation => {
                if (contactArrayMatch(conversation.recipients, recipients)) {
                    madeChange = true
                    return { ...conversation, messages: [...conversation.messages, newMessage] }
                }
                // return the same conversation if no new messages sent
                return conversation
            })

            if(madeChange) {
                return newConversations
            } else {
                return [...prevConversations, { recipients, messages: [newMessage] } ]
            }
        })
    }

    // sendmessage function to pass back into openconversations
    function sendMessage(recipients, text) {
        addMessage({ recipients, text, sender: id })
    }

    // conversation formatter mapping through selected contacts for each convo
    const formattedConvos = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        // mapping through messages to display them & the sender that each message is from
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    })

    // wrapping everything to pass into the return in here since its alot
    const providerValue = {
        conversations: formattedConvos,
        selectedConversation : formattedConvos[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation, sendMessage
    }

    return (
        <ConversationContext.Provider value={providerValue} >
            { children }
        </ConversationContext.Provider>
    )
}

// function to check contacts in array
const contactArrayMatch = (arrA, arrB) => {
    if (arrA.length !== arrB.length) return false

    arrA.sort()
    arrB.sort()

    return arrA.every((element, index) => {
        return element === arrB[index]
    })
}
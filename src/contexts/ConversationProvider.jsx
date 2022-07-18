import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContext } from 'react'
import { useState } from 'react'
import { useContacts } from './ContactProvider'
import { useSocket } from './SocketConnection'
import { useEffect } from 'react'
import { useCallback } from 'react'


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

    // socket import
    const socket = useSocket()

    // create new conversation function
    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [ ...prevConversations, { recipients, messages: [] }]
        })
    }

    // function that adds message to conversation - changed to usecallback to use as dependency in useEffect
    const addMessage = useCallback(({ recipients, text, sender }) => {
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
                // return conversation if no new messages sent
                return conversation
            })

            if(madeChange) {
                return newConversations
            } else {
                return [...prevConversations, { recipients, messages: [newMessage] } ]
            }
        })
    }, [setConversations])

    // useEffect for this to run when new message is added
    useEffect(() => {
        if (socket == null) {
            return
        } else {
            // event listener to call addmessage function if socket connection detects received message
            socket.on('receive-message', addMessage)
            // turns the event listener off afterwards
            return () => socket.off('receive-message')
        }
    }, [socket, addMessage])

    // sendmessage function
    function sendMessage(recipients, text) {

        socket.emit('send-message', { recipients, text })

        addMessage({ recipients, text, sender: id })
    }

    // map the selected contacts in each conversation in chat list
    const formattedConvos = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        // map through messages to display message & sender
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

    // wrapping everything to pass into the return in here cuz its alot
    const providerValue = {
        conversations: formattedConvos,
        selectedConversation : formattedConvos[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
    }

    return (
        <ConversationContext.Provider value={providerValue} >
            { children }
        </ConversationContext.Provider>
    )
}

// function to check contacts in array
const contactArrayMatch = (arrA, arrB) => {
    if (arrA.length !== arrB.length) {
        return false
    } else {
        arrA.sort()
        arrB.sort()

        return arrA.every((element, index) => {
            return element === arrB[index]
        })
    }
}
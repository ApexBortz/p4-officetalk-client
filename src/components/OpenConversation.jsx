import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
// import { useRef, useEffect } from 'react'
import { useConversations } from '../contexts/ConversationProvider'
import { useCallback } from 'react'


// component to show open conversations & textbox with message send form
const OpenConversation = () => {

    // usestate for the text in message box
    const [ text, setText ] = useState('')
    
    // useref for scrolling down to last message in box
    // const lastMessageRef = useRef()

    // usecallback to scroll down to last message when you send a message
    const setRef = useCallback(newestMessage => {
        if(newestMessage) {
            newestMessage.scrollIntoView({ smooth: true })
        }
    }, [])

    const { sendMessage, selectedConversation } = useConversations()

    // handlesubmit function for sending messages
    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(recipient => recipient.id), text)

        setText('')
    }

    // useEffect(() => {
    //     if(lastMessageRef.current) {
    //         lastMessageRef.current.scrollIntoView({ smooth: true })
    //     }
    // })

    return (
        <div className='mx-2 d-flex flex-column flex-grow-1 rounded overflow-auto' 
            style={{ border: 'solid lightgray 2px', height: '95vh' }}>
            <div className='flex-grow-1'>
                <div className='h-100 d-flex flex-column align-items-start justify-content-end'>

                {/* map send messages & & sender */}
                {selectedConversation.messages.map((message, index) => {
                    const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        <div className={`${message.fromMe ? 'align-self-end' : ''}`}>
                            <div key={index} className='MessageBubble'
                                 ref={lastMessage ? setRef : null} >

                                <div className={`rounded px-3 py-2 ${message.fromMe ? 'bg-primary text-white' : 'bg-success text-white'}`}>
                                    {message.text}
                                </div>

                                <div className='ContactLabel'>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>

            </div>

            <Form onSubmit={handleSubmit} className='MessageForm' >
                <Form.Group>
                    <InputGroup className='TextBox'>
                        <Form.Control 
                            as='textarea' 
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '100px', resize: 'inherit' }}
                            required />
                            <Button variant='outline-success' type='submit'>Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation
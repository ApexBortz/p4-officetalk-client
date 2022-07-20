import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useConversations } from '../contexts/ConversationProvider'
import { useCallback } from 'react'
import { ArrowCircleUpIcon } from '@heroicons/react/outline'


// component to show open conversations & textbox with message send form
const OpenConversation = () => {

    // usestate for the text in message box
    const [ text, setText ] = useState('')

    // usecallback to scroll into view of newest message
    const setRef = useCallback(newestMessage => {
        if(newestMessage) {
            newestMessage.scrollIntoView()
        }
    }, [])

    // extract sendmessage & selected convos from context
    const { sendMessage, selectedConversation } = useConversations()

    // handlesubmit function for sending messages
    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(recipient => recipient.id), text)

        setText('')
    }

    return (
        <div className='mx-2 d-flex flex-column flex-grow-1 rounded overflow-auto' 
            style={{ border: 'solid lightgray 2px', height: '95vh' }}>
            <div className='flex-grow-1'>
                <div className='h-100 d-flex flex-column align-items-start justify-content-end'>
                {/* map send messages & sender */}
                {selectedConversation.messages.map((message, index) => {
                    const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        // classname ternary checks if message is from me
                        <div className={`${message.fromMe ? 'align-self-end' : ''}`} key={index}>
                            <div key={index} className='MessageBubble'
                                 ref={lastMessage ? setRef : null} >

                                <div className={`rounded px-3 py-2 ${message.fromMe ? 'bg-primary text-white' : 'bg-success text-white'}`}
                                     key={index} >
                                    {message.text}
                                </div>

                                <div className='SenderLabel'>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

            <Form onSubmit={handleSubmit}  >
                <Form.Group className='MessageForm'>
                    <InputGroup className='TextBox'>
                        <Form.Control 
                            as='textarea' 
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '50px', resize: 'inherit' }}
                            required />

                        <Button variant='outline-success' type='submit'>
                            Send
                            <ArrowCircleUpIcon className='SendIcon' />
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation
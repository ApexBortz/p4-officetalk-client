import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useConversations } from '../contexts/ConversationProvider'

// component to show open conversations & textbox with message send form
const OpenConversation = () => {

    // usestate for the text in message box
    const [ text, setText ] = useState('')

    const { sendMessage, selectedConversation } = useConversations()

    // handlesubmit function for sending messages
    const handleSubmit = (e) => {
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(recipient => recipient.id), text)
    }

    return (
        <div className='flexbox d-flex flex-column flex-grow-1'>
            open conversation
            <div className='flex-grow-1 overflow-auto'>

            </div>
            <Form onSubmit={handleSubmit} className='TextBox'>
                <Form.Group>
                    <InputGroup>
                        <Form.Control 
                            as='textarea' 
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height: '100px', resize: 'inherit' }}
                            required />
                            <Button variant='success' type='submit'>Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>

        </div>
    )
}

export default OpenConversation
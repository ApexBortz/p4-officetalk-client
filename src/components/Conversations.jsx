import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationProvider'

const Conversations = () => {

    const { conversations } = useConversations()

    return (
        
        // displaying the conversations youve started along with the contacts in that conversation
        <ListGroup variant='flush' >
            { conversations.map((conversation, index) => (
                <ListGroup.Item key={index}>
                    { conversation.recipients.map(recipient => recipient.name).join(', ') }
                </ListGroup.Item>
            ))}
        </ListGroup>

    )
}

export default Conversations
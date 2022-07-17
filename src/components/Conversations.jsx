import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationProvider'

const Conversations = () => {

    const { conversations, selectConversationIndex } = useConversations()

    return (
        
        // displaying the conversations youve started along with the contacts in that conversation
        <ListGroup variant='' >
            { conversations.map((conversation, index) => (
                <ListGroup.Item 
                    key={index} 
                    action
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                    className='ConversationList' >

                    { conversation.recipients.map(recipient => recipient.name).join(', ') }

                </ListGroup.Item>
            ))}
        </ListGroup>

    )
}

export default Conversations
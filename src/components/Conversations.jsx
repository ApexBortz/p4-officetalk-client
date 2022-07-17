import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationProvider'

// conversations component for list of conversations
const Conversations = () => {

    // extract conversations from conversationprovider
    const { conversations, selectConversationIndex } = useConversations()

    return (
        
        // displaying conversations started along with contacts in that conversation
        <ListGroup>
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
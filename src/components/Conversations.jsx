import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationProvider'
import { ChatAltIcon } from '@heroicons/react/outline'

// conversations component for list of conversations
const Conversations = () => {

    // extract conversations from conversationprovider
    const { conversations, selectConversationIndex } = useConversations()

    return (
        
        // display conversations along with contacts in that conversation
        <ListGroup>
            { conversations.map((conversation, index) => (
                <ListGroup.Item 
                    action
                    key={index} 
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                    className='ConversationList'
                    variant='primary' >

                    { conversation.recipients.map(recipient => recipient.name).join(', ') }
                    <ChatAltIcon className='ChatIcon' />
                </ListGroup.Item>
            ))}
        </ListGroup>

    )
}

export default Conversations
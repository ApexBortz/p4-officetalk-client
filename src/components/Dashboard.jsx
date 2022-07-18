import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationProvider'

const Dashboard = ({ id }) => {

    // extract selected convos
    const { selectedConversation } = useConversations()
    
    // only renders openconversations component if you select a chat
    return (
        <div className='d-flex'>
            <Sidebar id={id} />
            { selectedConversation && <OpenConversation /> }
        </div>
    )
}

export default Dashboard
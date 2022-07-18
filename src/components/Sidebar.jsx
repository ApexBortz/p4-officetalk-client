import React from 'react'
import { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import { UserGroupIcon } from '@heroicons/react/outline'
import { UserAddIcon } from '@heroicons/react/outline'
import { IdentificationIcon } from '@heroicons/react/outline'
import { InboxInIcon } from '@heroicons/react/outline'
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const conversations_key = 'conversations'
const contacts_key = 'contacts'

const Sidebar = ({ id }) => {

    // usestate for switching between conversations tab and contacts tab
    const [ activeKey, setActiveKey ] = useState(conversations_key)

    // useState for open & closing contact & conversation modals
    const [ modalOpen, setModalOpen ] = useState(false)

    // activekey for switching active tabs
    const openConversation = activeKey === conversations_key

    // close modal function that gets passed into both modals
    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className='Sidebar' style={{ width: '270px' }} >

            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >

                <Nav variant='pills flex-column-2' className='SidebarContainer'>
                    <Nav.Item>
                        <Nav.Link eventKey={conversations_key}>
                            Your Chats <InboxInIcon className='YourChatIcon' />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contacts_key}>
                            Contacts <UserGroupIcon className='ContactIcon' />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className='mt-3 overflow-auto'>
                    <Tab.Pane eventKey={conversations_key}>
                        <Conversations />
                    </Tab.Pane>
                </Tab.Content>

                <Tab.Content className='mt-3 overflow-auto'>
                    <Tab.Pane eventKey={contacts_key}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
                
            <Modal show={modalOpen} onHide={closeModal} >
                { openConversation ? 
                    <NewConversationModal closeModal={closeModal} /> : 
                    <NewContactModal closeModal={closeModal} /> }
            </Modal>

            <div className='YourId'>
                <IdentificationIcon className='IdIcon' />
                Your Id: <span className='text-muted'>{id}</span>
            </div>

            <Button onClick={() => setModalOpen(true)} variant='outline-success'>
                New { openConversation ? 'Conversation' : 'Contact'}
                { openConversation ? <ChatAlt2Icon className='ChatIcon' /> : <UserAddIcon className='UserAdd'/>}
            </Button>

        </div>
    )
}

export default Sidebar
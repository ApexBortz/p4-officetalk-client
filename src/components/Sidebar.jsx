import { useState } from 'react'
import { Tab, Nav } from 'react-bootstrap'
import Contacts from './Contacts'
import Conversations from './Conversations'

const conversations_key = 'conversations'
const contacts_key = 'contacts'

const Sidebar = ({ id }) => {

    const [ activeKey, setActiveKey ] = useState(conversations_key)

    return (
        <div className='flex flex-column' style={{ widht: '150px' }} >
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                
                <Nav variant='tabs' className='justif-content-center' >
                    <Nav.Item>
                        <Nav.Link eventKey={conversations_key}>Your Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contacts_key}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey={conversations_key}>
                        <Conversations />
                    </Tab.Pane>
                </Tab.Content>

                <Tab.Content>
                    <Tab.Pane eventKey={contacts_key}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>


            </Tab.Container>
        </div>
    )
}

export default Sidebar
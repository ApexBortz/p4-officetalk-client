import React from 'react'
import { useContacts } from '../contexts/ContactProvider'
import { ListGroup } from 'react-bootstrap'


const Contacts = () => {

    // extract contacts from usecontacts
    const { contacts } = useContacts()

    // map through contacts
    return (
        <div>
            <ListGroup>
                { contacts.map(contact => (
                    <ListGroup.Item 
                        key={contact.id}
                        variant='primary'
                        className='ContactList' >
                        { contact.name }
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Contacts
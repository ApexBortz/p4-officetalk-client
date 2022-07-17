import React from 'react'
import { useContacts } from '../contexts/ContactProvider'
import { ListGroup } from 'react-bootstrap'

const Contacts = () => {

    // extracting contacts from usecontacts
    const { contacts } = useContacts()

    // mapping through contacts list
    return (
        <ListGroup >
            { contacts.map(contact => (
                <ListGroup.Item 
                    key={contact.id}
                    variant='info'
                    className='ContactList' >
                    { contact.name }
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default Contacts
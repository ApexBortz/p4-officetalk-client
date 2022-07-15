import React from 'react'
import { useContacts } from '../contexts/ContactProvider'
import { ListGroup } from 'react-bootstrap'

const Contacts = () => {

    const contacts = useContacts()

    return (
        // <ListGroup>
        //     { contacts.map(contact => (
        //         <ListGroup.Item key={contact.id}>
        //             { contact.name }
        //         </ListGroup.Item>
        //     ))}
        // </ListGroup>

        <div className='Contacts'>
            Contacts
        </div>
    )
}

export default Contacts
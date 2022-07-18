import React from 'react'
import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactProvider'
import { useConversations } from '../contexts/ConversationProvider'
import { UploadIcon } from '@heroicons/react/outline'

const NewConversationModal = ({ closeModal }) => {

    // state for selected contacts
    const [selectedContacts, setSelectedContacts] = useState([])

    // extracting contacts from context provider
    const { contacts } = useContacts()

    const { createConversation } = useConversations()

    // handle submit function for creating new conversation
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(useConversations)
        createConversation(selectedContacts)

        closeModal()
    }

    // check box change
    const handleCheckboxChange = (contactId) => {
        setSelectedContacts(prevSelectedContacts => {
            if(prevSelectedContacts.includes(contactId)) {
                return prevSelectedContacts.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [ ...prevSelectedContacts, contactId ]
            }
        })
    }

    return (
        <div className='ContactModal'>
        <Modal.Header closeButton>New Conversation</Modal.Header>
        <Modal.Body>

            <Form onSubmit={handleSubmit} >
                { contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                            type='checkbox' 
                            value={selectedContacts.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)} />
                    </Form.Group>
                ))}

                <Button className='mt-3' type='submit' variant='outline-success'>
                    Create <UploadIcon className='CreateConvo' />
                </Button>
            </Form>

        </Modal.Body>
        </div>
    )
}

export default NewConversationModal
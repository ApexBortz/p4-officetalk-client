import React from 'react'
import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactProvider'

// new contact modal
const NewContactModal = ({ closeModal }) => {

    const idRef = useRef()

    const nameRef = useRef()

    const { createContact }  = useContacts()

    // submit handler to make new contact
    const handleSubmit = (e) => {
        e.preventDefault()
        
        createContact(idRef.current.value, nameRef.current.value)

        closeModal()
    }

    return (
        <div className='ContactModal'>
        <Modal.Header closeButton>New Contact</Modal.Header>
        <Modal.Body>

            <Form onSubmit={handleSubmit} >

                <Form.Group>
                    <Form.Label>Username or Id:</Form.Label>
                    <Form.Control type='text' ref={idRef} required />
                </Form.Group>

                <Form.Group className='mt-2'>
                    <Form.Label>Save As:</Form.Label>
                    <Form.Control type='text' ref={nameRef} required />
                </Form.Group>

                <Button className='mt-3' type='submit' variant='outline-success'>Create</Button>

            </Form>

        </Modal.Body>
        </div>
    )
}

export default NewContactModal
import React from 'react'
import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactProvider'

const NewContactModal = ({ closeModal }) => {

    const idRef = useRef()

    const nameRef = useRef()

    // const { createContact } = useContacts()

    const handleSubmit = (e) => {
        e.preventDefault()
        // createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    return (
        <>
        <Modal.Header closeButton>New Contact</Modal.Header>
        <Modal.Body>

            <Form onSubmit={handleSubmit} >

                <Form.Group>
                    <Form.Label>Username or Id</Form.Label>
                    <Form.Control type='text' ref={idRef} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type='text' ref={nameRef} required />
                </Form.Group>

                <Button className='m-2' type='submit' variant='outline-success'>Create</Button>

            </Form>

        </Modal.Body>
        </>
    )
}

export default NewContactModal
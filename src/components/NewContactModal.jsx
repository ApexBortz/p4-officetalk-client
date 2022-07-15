import { Modal, Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useContacts } from '../contexts/ContactProvider'

const NewContactModal = ({ closeModal }) => {

    const id = useRef()

    const name = useRef()

    // const { createContact } = useContacts()

    const handleSubmit = (e) => {
        e.preventDefault()
        // createContact(id.current.value, name.current.value)
        closeModal()
    }

    return (
        <>
        <Modal.Header closeButton>New Contact</Modal.Header>
        <Modal.Body>

            <Form onSubmit={handleSubmit} >

                <Form.Group>
                    <Form.Label>Username or Id</Form.Label>
                    <Form.Control type='text' ref={id} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type='text' ref={name} required />
                </Form.Group>

                <Button className='m-2' type='submit' variant='outline-success'>Create</Button>

            </Form>

        </Modal.Body>
        </>
    )
}

export default NewContactModal
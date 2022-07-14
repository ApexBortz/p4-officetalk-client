import React from 'react'
import { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 } from 'uuid'


const Login = ({ onIdSubmit }) => {

    const id = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onIdSubmit(id.current.value)
    }

    const createNewId = () => {
        onIdSubmit(v4())
    }

    return (
        <Container className='align-items-center d-flex' style={{ height: '50vh' }}>
            <Form onSubmit={handleSubmit} className='w-50'>
                <Form.Group>
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control type='text' ref={id}></Form.Control>
                </Form.Group>
                <Button type='submit' className='m-2'>Enter</Button>
                <Button onClick={createNewId} variant='secondary'>Create New Id</Button>
            </Form>
        </Container>
    )
}

export default Login
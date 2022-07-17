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
    <div>
        <div className='Header'>
            <img src='/officetalk_5.png' alt='Officetalk' style={{ width: '25%' }} className='MainLogo'/>
        </div>

        <Container className='justify-content-center align-items-center d-flex' style={{ height: '50vh' }}>
            <Form onSubmit={handleSubmit} className='w-50'>
                <Form.Group>
                    <Form.Label>Enter Your Username</Form.Label>
                    <Form.Control type='text' ref={id}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='outline-success' className='m-2'>Confirm</Button>
                <Button onClick={createNewId} variant='outline-secondary'>Create New Id</Button>
            </Form>
        </Container>
    </div>

    )
}

export default Login
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddTask = () => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className='my-5 p-4 shadow'>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className='mb-3' controlId="title">
              <Form.Label className='fw-bold'>Title</Form.Label>
              <Form.Control {...register('title')} type="text" />
            </Form.Group>
            <Form.Group className='mb-3' controlId="description">
              <Form.Label className='fw-bold'>Description</Form.Label>
              <Form.Control {...register('description')} as="textarea" rows={4}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId="status">
              <Form.Label className='fw-bold'>Status</Form.Label>
              <Form.Control {...register('status')} as="select">
                <option disabled value="">select one</option>
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 mt-3">
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTask;

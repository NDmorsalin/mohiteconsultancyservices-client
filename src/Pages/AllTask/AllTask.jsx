import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const AllTasks = () => {
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const tasks = [
    { title: 'Task 1', description: 'Description for Task 1', status: 'To Do' },
    { title: 'Task 2', description: 'Description for Task 2', status: 'In Progress' },
    { title: 'Task 3', description: 'Description for Task 3', status: 'Done' },
  ];

  const handleUpdateTask = (data) => {
    // onUpdateTask(data);
    console.log(data);
    setEditMode(false);
    reset();
  };

  const renderTaskCard = (task, index) => {
    const { title, description, status } = task;

    const handleEditClick = () => {
      setEditMode(true);
    };

    return (
      <Card key={index} className={`mb-3 ${getStatusColorClass(status)}`}>
        <Card.Body>
          {editMode ? (
            <Form onSubmit={handleSubmit(handleUpdateTask)}>
              <Form.Group controlId={`title-${index}`}>
                <Form.Control {...register(`title-${index}`)} type="text" defaultValue={title} />
              </Form.Group>
              <Form.Group controlId={`description-${index}`}>
                <Form.Control {...register(`description-${index}`)} as="textarea" rows={4} defaultValue={description} />
              </Form.Group>
              <Button type="submit" variant="primary" className="me-2">Update</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            </Form>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{title}</h5>
                  <p>{description}</p>
                </div>
                <span>{status}</span>
              </div>
              <Button variant="info" onClick={handleEditClick}>Edit</Button>
            </>
          )}
        </Card.Body>
      </Card>
    );
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-primary text-white';
      case 'In Progress':
        return 'bg-warning text-dark';
      case 'Done':
        return 'bg-success text-white';
      default:
        return '';
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          {tasks.map((task, index) => renderTaskCard(task, index))}
        </Col>
      </Row>
    </Container>
  );
};

export default AllTasks;

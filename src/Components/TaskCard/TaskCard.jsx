/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utility/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import swal from "sweetalert";

const TaskCard = ({ task, refetch }) => {
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, setValue, reset, getValues } = useForm();
  const {
    data: updatedTask = {},
    mutate,
    isError,
    isLoading,
  } = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => {
      const response = await axiosInstance.put(`/task/${task._id}`, data);
      return response.data;
    },
    onSuccess: () => {
      refetch();
      swal({
        title: "Success",
        text: "Task updated successfully",
        icon: "success",
        timer: 2000,
      });
    },
  });

  const { title, description, status } = task;

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdateTask = (data) => {
    
    mutate({
      title: data?.title,
      description: data?.description,
    });

    setEditMode(false);
    refetch();
    reset();
  };

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    const data = { status };
    mutate(data);
    refetch();
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
    setValue("status", status);
  }, []);

  return (
    <Col sm={6} md={4}>
      <Card key={task?._id} className={`mb-3 ${getStatusColorClass(status)}`}>
        <Card.Body>
          {editMode ? (
            <Form onSubmit={handleSubmit(handleUpdateTask)}>
              <Form.Group controlId={`title-${task?._id}`}>
                <Form.Control
                  className="mb-2"
                  {...register(`title`)}
                  type="text"
                  defaultValue={title}
                />
              </Form.Group>
              <Form.Group controlId={`description`}>
                <Form.Control
                  className="mb-2"
                  {...register(`description`)}
                  as="textarea"
                  rows={3}
                  defaultValue={description}
                />
              </Form.Group>
              <Button
                disabled={isLoading}
                type="submit"
                variant="primary"
                className="me-2"
              >
                Update
              </Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h5>{title}</h5>

                <Form.Control
                  className={`mb-3 d-inline-block w-auto text-center ${getStatusColorClass(
                    status
                  )}`}
                  defaultValue={getValues("status")}
                  {...register("status")}
                  onChange={handleStatusChange}
                  as="select"
                >
                  <option value="pending">
                    {isLoading ? "Loading " : "To Do"}
                  </option>
                  <option value="progress">
                    {isLoading ? "Loading " : "In Progress"}
                  </option>
                  <option value="complete">
                    {isLoading ? "Loading " : "Done"}
                  </option>
                </Form.Control>
              </div>
              <div>
                <p>{description}</p>
              </div>
              <div className="d-flex justify-content-between">
                <Button
                  disabled={isLoading}
                  variant="primary"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={handleEditClick}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TaskCard;

const getStatusColorClass = (status) => {
  switch (status) {
    case "pending":
      return "border-primary text-dark";
    case "progress":
      return "border-warning text-dark";
    case "complete":
      return "border-success text-dark";
    default:
      return "";
  }
};

import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utility/axiosInstance";
import swal from "sweetalert";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    data: addedTask = {},
    isError,
    isLoading,
    mutate,
  } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (newTask) => {
      console.log("newTask", newTask);
      const response = await axiosInstance.post("/task", newTask);
      return response.data;
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
    mutate(data);
    swal({
      title: "Success",
      text: "Task added successfully",
      icon: "success",
      timer: 2000,
    });
    reset();
  };

  console.log({ addedTask, isError, isLoading });
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="my-5 p-4 shadow">
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                type="text"
              />
              <p className="text-danger">
                {errors.title && errors.title.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                as="textarea"
                rows={4}
              />
              <p className="text-danger">
                {errors.description && errors.description.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label className="fw-bold">Status</Form.Label>
              <Form.Control {...register("status")} as="select">
                <option disabled value="">
                  select one
                </option>
                <option value="pending">To Do</option>
                <option value="progress">In Progress</option>
                <option value="complete">Done</option>
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

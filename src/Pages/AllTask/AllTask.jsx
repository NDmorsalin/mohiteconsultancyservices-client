import { Container, Row } from "react-bootstrap";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utility/axiosInstance";
import { useAuth } from "../../Provider/AuthProvider";

const AllTasks = () => {
  const { user } = useAuth();
  const {
    data: allTasks = [],
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/task", {
        headers: {
          uid: user?.uid,
        },
      });
      return response.data;
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Container>
      <Row className="justify-content-center">
        {allTasks.map((task, index) => (
          <TaskCard
            key={task?._id}
            refetch={refetch}
            task={task}
            index={index}
          />
        ))}
      </Row>
    </Container>
  );
};

export default AllTasks;

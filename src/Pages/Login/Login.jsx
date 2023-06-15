import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axiosInstance from "../../utility/axiosInstance";

const Login = () => {
  const { login, loading, loginWithGoogle, setLoading } = useAuth();
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const user = await login(email, password);
      // console.log({email,password});
      console.log(user);
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      setError(error.code);
      setLoading(false);
      console.log({ error });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const { user } = await loginWithGoogle();
      console.log(user);
      const dbUserInfo = await axiosInstance.post("/users", {
        email: user.email.toLowerCase(),
        name: user.displayName,
        photoUrl: user.photoURL,
      });
      console.log("google login", dbUserInfo);
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error.code);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs md="6 p-3 shadow-lg my-5">
          <p className="text-center fs-3 fw-bold">
           Login on Task Management Application
          </p>

          <Form onSubmit={handleSubmit(handleLogin)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/i,
                    message:
                      "Password must contain at least one letter, one digit, and one special character",
                  },
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicTogglePassword">
              <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
            </Form.Group>
            <p className="">{error}</p>
            <Button disabled={loading} variant="primary" type="submit">
              Log in
            </Button>

            <div className="text-center mt-3">
              <span>Or login with</span>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="danger" onClick={handleGoogleLogin}>
                Login with Google
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

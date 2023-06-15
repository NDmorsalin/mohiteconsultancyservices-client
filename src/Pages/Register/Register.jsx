import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axiosInstance from "../../utility/axiosInstance";

const Register = () => {
  const { register: registerFirebase, loading,loginWithGoogle, setLoading } = useAuth();
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (data) => {
    const { email, password, name, photoUrl } = data;

    try {
      const user = await registerFirebase(email, password, name, photoUrl);
      // console.log({email,password});
      console.log(user);
      const dbUserInfo = await axiosInstance.post("/users", {
        email: email.toLowerCase(),
        role: "student",
        name,
        photoUrl,
      });
      console.log({ dbUserInfo });
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log({ error: error.message });
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const {user} = await loginWithGoogle();
      console.log(user);
       const dbUserInfo = await axiosInstance.post("/users", {
        email:user.email.toLowerCase(),
        name:user.displayName,
        photoUrl:user.photoURL,
      }); 
      console.log('google login',dbUserInfo);
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
          <p className="text-center fs-3 fw-bold">Register on NoteKeeper</p>
          <Form onSubmit={handleSubmit(handleRegister)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                Name <sup className="text-danger m-0 p-0 top-0 fs-2">*</sup>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Email address{" "}
                <sup className="text-danger m-0 p-0 top-0 fs-2">*</sup>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
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

            <Form.Group className="mb-3" controlId="formBasicPhoto">
              <Form.Label>Photo URL </Form.Label>
              <Form.Control type="text" placeholder="Enter your photo URL" />
              {errors.photoUrl && (
                <span className="text-danger">{errors.photoUrl.message}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Password <sup className="text-danger m-0 p-0 top-0 fs-2">*</sup>
              </Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>
                Confirm Password{" "}
                <sup className="text-danger m-0 p-0 top-0 fs-2">*</sup>
              </Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-danger">
                  {errors.confirmPassword.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTogglePassword">
              <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
            </Form.Group>
            <p className="">{error}</p>
            <Button disabled={loading} variant="primary" type="submit">
              Sign up
            </Button>

            <div className="text-center mt-3">
              <span>Or sign up with</span>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button onClick={handleGoogleLogin} variant="danger">Google</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

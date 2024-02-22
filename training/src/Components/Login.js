import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
import DownPage from "./DownPage";

const Login = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const [inputData, setInputData] = useState({
    name: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      
      const response = await axios.post("http://localhost:5002/api/users/logIn", data, { withCredentials: true });
      
      if (response.status === 200) {
      
        navigate('/home');
      }
      
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="main-div mx-auto p-5 w-100">
        <Container className="main-container">
          <div className="main-form mx-auto">
            <Form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded"
            >
              <div className="header_main d-flex justify-content-center text-white rounded-top  p-3">
                <h1 className=" h-25 py-4 fw-bold">Endorphin</h1>
              </div>
              <div className="text-center mt-5">
                <p className="fw-bolder fs-5 mb-0"> Log In </p>
                <p className="paragraph mt-1">
                  Enter your Username and Password to <br />
                  Access Endorphin Panel.
                </p>
              </div>
              <div>
                <Row className="mb-3 px-4 paragraph">
                  <Form.Group as={Col} md="" controlId="validationCustom01">
                    <Form.Label className=" mt-3">User Name</Form.Label>
                    <Controller
                      name="name"
                      control={control}
                      value={inputData.name}
                      onChange={inputChange}
                      rules={{ required: "Username is required" }}
                      render={({ field }) => (
                        <>
                          <Form.Control
                            {...field}
                            type="text"
                            placeholder="Enter your Username"
                            isInvalid={!!errors.name}
                            className="custom-placeholder"
                          />
                          {errors.name && (
                            <Form.Control.Feedback type="invalid">
                              {errors.name.message}
                            </Form.Control.Feedback>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 px-4 paragraph">
                  <Form.Group as={Col} md="" controlId="validationCustom04">
                    <div className="d-flex justify-content-between">
                      <Form.Label>Password</Form.Label>
                      <Link to="/forget" className="forget">
                        Forgot your Password ?
                      </Link>
                    </div>
                    <Controller
                      name="password"
                      value={inputData.password}
                      onChange={inputChange}
                      control={control}
                      className="position-relative"
                      rules={{
                        required: "Password is required",
                        pattern: {
                          value: /^/,
                          message: "Password must meet certain criteria.",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Form.Control
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="custom-placeholder"
                            placeholder="Enter your Password"
                            isInvalid={!!errors.password}
                          />
                          {/* <Button
                            variant="link"
                            className="position-absolute eye-btn"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeSlash /> : <Eye />}
                          </Button> */}
                          {errors.password && (
                            <Form.Control.Feedback type="invalid">
                              {errors.password.message}
                            </Form.Control.Feedback>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Row>
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="mb-5 button_main">
                    Log In
                  </Button>
                </div>
              </div>
            </Form>
            <div className="text-center mt-4">
              <p className="paragraph">
                Don't have an account ?
                <span>
                  <Link to="/signUp" className="Sign_link ms-1">
                    Sign Up
                  </Link>
                </span>
              </p>
              <DownPage />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};


export default Login;

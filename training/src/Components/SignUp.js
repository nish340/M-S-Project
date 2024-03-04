import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { img1 } from "../Images/image";
import CheckExample from "./Checkbox";
import DownPage from "./DownPage";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: ""  
  });

  const navigate = useNavigate();

  const submitForm = async (data) => {
    try{
    const response = await axios.post(process.env.BASE_URL + " /api/users/signUp", data, { withCredentials: true });
    // console.log(response.data);
    if (response.status === 200) {
      navigate ('/')
    }
    reset();
  } catch (error) {
    console.error("Error:", error);
  }
}
const inputChange = (e) => {
  setInputData({ ...inputData, [e.target.name]: e.target.value });
};
 

  return (
    <>
      <div className="main-div mx-auto p-5 w-100">
        <Container className="main-container">
          <div className="main-form mx-auto">
            <Form
              noValidate
              onSubmit={handleSubmit(submitForm)}
              className="bg-white rounded"
            >
              <div className="header_main d-flex justify-content-center text-white rounded-top p-3">
              <h1 className=" h-25 py-4 fw-bold ">Endorphin</h1> 
              </div>
              <div className="text-center mt-5">
                <p className="fw-bolder fs-5 mb-0"> Sign Up </p>
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
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <Form.Control
                            {...field}
                            type="text"
                            placeholder="Your Name"
                            isInvalid={errors.name}
                            className="custom-placeholder"
                          />
                          {errors.name && (
                            <Form.Control.Feedback type="invalid">
                              First Name is required
                            </Form.Control.Feedback>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 px-4 paragraph">
                  <Form.Group as={Col} md="" controlId="validationCustom02">
                    <Form.Label>Email</Form.Label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Form.Control
                            {...field}
                            type="text"
                            placeholder="Email"
                            isInvalid={!!errors.email}
                            className="custom-placeholder"
                          />
                          {errors.email && (
                            <Form.Control.Feedback type="invalid">
                              {errors.email.message}
                            </Form.Control.Feedback>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3 px-4 paragraph">
                  <Form.Group as={Col} md="" controlId="validationCustom04">
                    <Form.Label>Password</Form.Label>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
                          message:
                            "Password must contain at least one number and one uppercase letter, and at least 10 or more characters",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Form.Control
                            {...field}
                            type="password"
                            placeholder="Password"
                            isInvalid={!!errors.password}
                            className="custom-placeholder"
                          />
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
                <div className="ms-4 mt-4 Sign_link">  <CheckExample/></div>
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="mb-5 button_main">
                    Sign Up
                  </Button>
                </div>
              </div>
            </Form>
            <div className="text-center mt-3">
              <p className="paragraph">
                Already have an account?
                <span>
                  <Link to="/" className="Sign_link ms-1">
                    Log In
                  </Link>
                </span>
              </p>
              <DownPage/>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;

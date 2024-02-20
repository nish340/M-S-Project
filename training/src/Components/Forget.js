import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container, Alert } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { img1 } from "../Images/image";
import DownPage from "./DownPage";

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitForm = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/users/forgot-password",
        data,
        { withCredentials: true }
      );

      // Assuming your backend sends a success status code upon successful email submission
      if (response.status === 200) {
        navigate("/");
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
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
                <h1 className=" h-25 py-4 fs-5 ">Endorphin</h1>
              </div>
              <div className="text-center mt-5">
                <p className="fw-bolder fs-5 mb-0"> Forgot Password </p>
                <p className="paragraph mt-1">
                  Enter your Username and we'll send you an email with
                  <br /> instructions to reset your password
                </p>
              </div>
              <div>
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
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="mb-5 button_main">
                    submit
                  </Button>
                </div>
              </div>
            </Form>
            {submitSuccess && (
              <Alert variant="success" className="text-center mt-3">
                An email has been sent with instructions to reset your password.
              </Alert>
            )}
            <div className="text-center mt-3">
              <p className="paragraph">
                Back To
                <span>
                  <Link to="/" className="Sign_link ms-1">
                    SignIn
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

export default ForgotPassword;

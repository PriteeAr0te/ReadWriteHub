import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const BASE_URL = "http://localhost:5000/api/auth";
  const [userType, setUserType] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    userType: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, email, userType, age, password, confirmPassword } =
      credentials;

    if (password !== confirmPassword) {
      alert("Passwords do not match", "danger");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          userType,
          age,
          password,
          confirmPassword,
        }),
      });
      console.log("userType = ", userType);
      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const json = await response.json();

      localStorage.setItem("token", json.authtoken);
      console.log("Registered Successfully");
      alert(
        "Email sent for verification on your registered email ID. Please verify!"
      );
      // navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong! Please Try Again.", "danger");
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 my-5 bg-slate-100 px-7 py-3">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Account type</Form.Label>
          <div>
            <Form.Check
              className="me-2"
              type="radio"
              onChange={onChange}
              id="author"
              name="userType"
              label="Author"
              value="author"
            />
            <Form.Check
              type="radio"
              onChange={onChange}
              id="reader"
              name="userType"
              label="Reader"
              value="reader"
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            name="age"
            id="age"
            onChange={onChange}
            placeholder="Enter your age"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            placeholder="Password"
            autocomplete="new-password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={onChange}
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            onChange={onChange}
            label="I agree to the terms and conditions"
            required
          />
        </Form.Group>
        <button
          className="w-100 bg-blue-500 text-white hover:bg-amber-500 border-white py-1"
          variant="primary"
          type="submit"
        >
          Register
        </button>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link className="underline" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;

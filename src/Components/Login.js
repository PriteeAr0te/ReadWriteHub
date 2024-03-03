import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const BASE_URL = "http://localhost:5000/api/auth";
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // replacing useHistory hook in v5 with useNavigate
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      // console.log(json)
      if (json) {
        //redirect
        localStorage.setItem("token", json.authtoken);
        alert("Login Successfully", "success");
        navigate("/");
      } else {
        alert("Invalid Username or Password", "danger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center min-h-[80vh]  max-w-md mx-auto my-10 px-4 bg-slate-100">
      <div className="w-full max-w-sm mx-auto space-y-4">
        <div className="space-y-2 text-center mb-10">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="Enter Your Mail"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                onChange={onChange}
                value={credentials.password}
                placeholder="Enter Your Password"
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white hover:bg-amber-500 border-white py-1"
              type="submit"
            >
              Login
            </button>
          </div>
        </Form>
        <div className="text-center text-sm">
          Don't have an account?
          <Link className="underline" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

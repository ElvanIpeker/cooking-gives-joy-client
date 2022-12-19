import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";

import "./styles.css";
import { postRequest } from "../../../service/apiClient";
import { LOGIN, SIGNUP } from "../../../constants/apiEndpoints";
import useAuth from "../../../context/auth/useAuth";
import { setToken } from "../../../service/axios/axiosInstance";
import { useLocation } from "react-router-dom";

const { Title } = Typography;

const LoginSignupPage = () => {
  const [mode, setMode] = useState("login");
  const [processing, setProcessing] = useState(false);
  const { setUser } = useAuth();
  const location = useLocation();

  const heading = {
    login: "Login",
    signup: "Sign Up",
  };

  useEffect(() => {
    const mode = location.state?.mode;
    mode && setMode(mode);
  }, [location]);

  const handleFormSubmit = async (values) => {
    setProcessing(true);
    try {
      const { data, success } = await postRequest(
        mode === "login" ? LOGIN : SIGNUP,
        values,
        true
      );
      if (success) {
        const {
          user: { username, _id: userId },
          token,
        } = data;
        setUser({ username, userId });
        setToken(token);
        localStorage.setItem(
          "gluten",
          JSON.stringify({
            username,
            token,
            userId,
          })
        );
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
    }
  };

  const handleModeChange = (mode) => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const helperText = {
    login: {
      text: "Dont have an account?",
      link: (
        <span
          className="orange-text pointer"
          onClick={() => handleModeChange(mode)}
        >
          Signup
        </span>
      ),
    },
    signup: {
      text: "Already have an account?",
      link: (
        <span
          className="orange-text pointer"
          onClick={() => handleModeChange(mode)}
        >
          Login
        </span>
      ),
    },
  };

  return (
    <>
      <Title>{heading[mode]}</Title>
      <div className="form-wrapper">
        <Form
          style={{ maxWidth: 500 }}
          initialValues={{
            username: "",
            password: "",
          }}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            rules={[{ required: true, message: "Username is required" }]}
            label="Username"
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Password is required" }]}
            label="Password"
            name="password"
            style={{ marginBottom: 0 }}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ marginTop: 5, marginBottom: 20 }}>
            <span className="subtle" style={{ marginRight: 5 }}>
              {helperText[mode].text}
            </span>
            {helperText[mode].link}
          </div>
          <Button loading={processing} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginSignupPage;

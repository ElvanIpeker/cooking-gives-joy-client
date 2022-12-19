import { Button, Col, Form, Input, notification, Row, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

import "./styles.css";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../service/apiClient";
import {
  ADDRECIPE,
  GETRECIPEBYID,
  EDITRECIPE,
} from "../../../constants/apiEndpoints";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const AddRecipe = ({ mode }) => {
  const [processing, setProcessing] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit") {
      const id = params.id;
      getRecipe(id);
    } else {
      form.resetFields();
      setImageUrl("");
    }
  }, [mode]);

  const getRecipe = async (id) => {
    try {
      const {
        success,
        data: { recipe },
      } = await getRequest(GETRECIPEBYID(id));
      if (success) {
        const serverUrl = process.env.REACT_APP_API_URL;
        form.setFieldsValue(recipe);
        const imageUrl = `${serverUrl}/images/${recipe?.file}`;
        setImageUrl(imageUrl);
      }
    } catch (err) {}
  };

  const initialValues = {
    name: "",
    serving: "",
    origin: "",
    calories: "",
    cookTime: "",
    ingredients: "",
    instructions: "",
    picture: "",
  };

  const handleFormSubmit = async (values) => {
    setProcessing(true);
    try {
      const payload = new FormData();
      for (let key in values) {
        payload.append(key, values[key]);
      }
      const apiRequest = mode === "edit" ? putRequest : postRequest;
      const { success, message } = await apiRequest(
        mode === "edit" ? EDITRECIPE(params.id) : ADDRECIPE,
        payload
      );
      if (success) {
        notification.open({
          type: "success",
          message: message,
        });
      }
      form.resetFields();
      if (mode === "edit") navigate("/my-recipes");
    } catch (err) {}
    setProcessing(false);
  };

  const onFileSelect = (file) => {
    form.setFieldValue("picture", file);
  };

  return (
    <div className="add-recipe-wrapper">
      <Title level={2} style={{ marginTop: 0 }}>
        {mode === "edit" ? "Edit" : "Add"} Recipe
      </Title>
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          rules={[{ required: true, message: "Name is required" }]}
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Row gutter={[10]}>
          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: "Serving is required" }]}
              label="Serving"
              name="serving"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: "Origin is required" }]}
              label="Origin"
              name="origin"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: "Calories is required" }]}
              label="Calories"
              name="calories"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item
              rules={[{ required: true, message: "Cook Time is required" }]}
              label="Cook Time"
              name="cookTime"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          rules={[{ required: true, message: "Ingredients are required" }]}
          label="Ingredients"
          name="ingredients"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Instruction is required" }]}
          label="Instructions"
          name="instructions"
        >
          <Input />
        </Form.Item>

        <Form.Item name="picture">
          <FileUploader
            onFileSelect={onFileSelect}
            initialImageUrl={imageUrl}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={processing}>
          {mode === "edit" ? "Edit" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

const FileUploader = ({ onFileSelect, initialImageUrl = "" }) => {
  const [imageUrl, setimageUrl] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setimageUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setimageUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const clearImage = () => {
    setimageUrl("");
  };

  return (
    <div
      className={`upload-wrapper ${imageUrl ? "" : "unselected"}`}
      onClick={imageUrl ? clearImage : handleClick}
    >
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileSelect}
      />
      {imageUrl ? (
        <img src={imageUrl} />
      ) : (
        <PictureOutlined style={{ fontSize: 30, color: "#80808080" }} />
      )}
    </div>
  );
};

export default AddRecipe;

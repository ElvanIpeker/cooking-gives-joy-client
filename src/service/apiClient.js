import { notification } from "antd";
import axiosInstance from "./axios/axiosInstance.js";

const getRequest = async (endpoint, showError = false) => {
  try {
    const res = await axiosInstance.get(endpoint);
    if (showError) {
      if (!res.data.success) {
        notification.open({
          message: "Alert",
          description: res.data.message,
          type: "warning",
        });
      }
    }
    return res.data;
  } catch (err) {
    showError &&
      notification.open({
        message: "Alert",
        description: err?.response?.data?.message,
        type: "error",
      });
  }
};

const postRequest = async (endpoint, data, showError = false) => {
  try {
    const res = await axiosInstance.post(endpoint, data);
    if (showError) {
      if (!res.data.success) {
        notification.open({
          message: "Alert",
          description: res.data.message,
          type: "warning",
        });
      }
    }
    return res.data;
  } catch (err) {
    console.error(err);
    showError &&
      notification.open({
        message: "Alert",
        description: err?.response?.data?.message,
        type: "error",
      });
  }
};

const putRequest = async (endpoint, data, showError = false) => {
  try {
    const res = await axiosInstance.put(endpoint, data);
    if (showError) {
      if (!res.data.success) {
        notification.open({
          message: "Alert",
          description: res.data.message,
          type: "warning",
        });
      }
    }
    return res.data;
  } catch (err) {
    showError &&
      notification.open({
        message: "Alert",
        description: err?.response?.data?.message,
        type: "error",
      });
  }
};

const deleteRequest = async (endpoint, showError = false) => {
  try {
    const res = await axiosInstance.delete(endpoint);
    if (showError) {
      if (!res.data.success) {
        notification.open({
          message: "Alert",
          description: res.data.message,
          type: "warning",
        });
      }
    }
    return res.data;
  } catch (err) {
    showError &&
      notification.open({
        message: "Alert",
        description: err?.response?.data?.message,
        type: "error",
      });
  }
};

const patchRequest = async (endpoint, data, showError = false) => {
  try {
    const res = await axiosInstance.patch(endpoint, data);
    if (showError) {
      if (!res.data.success) {
        notification.open({
          message: "Alert",
          description: res.data.message,
          type: "warning",
        });
      }
    }
    return res.data;
  } catch (err) {
    showError &&
      notification.open({
        message: "Alert",
        description: err?.response?.data?.message,
        type: "error",
      });
  }
};

export { getRequest, postRequest, putRequest, deleteRequest, patchRequest };

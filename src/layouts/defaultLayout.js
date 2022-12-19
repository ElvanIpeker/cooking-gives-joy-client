import { Avatar, Button, Typography } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../context/auth/useAuth";

const { Title } = Typography;

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useAuth();

  const handleNavigation = (link, params) => {
    navigate(`/${link}`, {
      state: params,
    });
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="default-layout">
      <header>
        <div className="right-wrapper">
          <Title
            style={{ color: "white" }}
            className="pointer"
            onClick={goToHome}
          >
            Cooking Gives Joy
          </Title>
          <Title level={5}>Welcome! {user?.username}</Title>
        </div>
        <div className="links">
          {user ? (
            <>
              <Button
                type="primary"
                onClick={() => handleNavigation("add-recipe")}
              >
                Add Recipe
              </Button>
              <Button
                type="primary"
                onClick={() => handleNavigation("my-recipes")}
              >
                My Recipies
              </Button>
              <Button type="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() =>
                  handleNavigation("auth", {
                    mode: "login",
                  })
                }
              >
                login
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  handleNavigation("auth", {
                    mode: "signup",
                  })
                }
              >
                Create Account
              </Button>
            </>
          )}
        </div>
      </header>
      <div className="page-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;

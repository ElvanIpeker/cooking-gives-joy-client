import { Col, notification, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  DELETERECIPE,
  GETALLRECIPES,
  GETMYRECIPE,
} from "../../../constants/apiEndpoints";
import useAuth from "../../../context/auth/useAuth";
import { deleteRequest, getRequest } from "../../../service/apiClient";
import "./styles.css";

const { Title } = Typography;

const HomePage = ({ mode }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipes();
  }, [mode]);

  const getAllRecipes = async () => {
    try {
      let {
        data: { recipes },
        success,
      } = await getRequest(mode == "self" ? GETMYRECIPE : GETALLRECIPES);
      if (success) {
        const serverUrl = process.env.REACT_APP_API_URL;
        recipes = recipes
          ? recipes.map((recipe) => ({
              ...recipe,
              imageUrl: `${serverUrl}/images/${recipe?.file}`,
            }))
          : [];
        setRecipes(recipes);
      }
    } catch (err) {}
  };

  const handleRecipeCardClick = (id) => navigate(`/recipe/${id}`);

  const onDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const { success, message } = await deleteRequest(DELETERECIPE(id));
      if (success) {
        notification.open({
          type: "success",
          message,
        });
        getAllRecipes();
      }
    } catch (err) {}
  };

  const onEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/edit-recipe/${id}`);
  };

  return (
    <div className="recipe-listing-wrapper">
      <Row gutter={[30, 30]}>
        {recipes.map((recipe) => (
          <Col xs={24} sm={16} md={8} lg={6} key={recipe?._id}>
            <RecipeCard
              {...recipe}
              handleRecipeCardClick={handleRecipeCardClick}
              actionsAllowed={mode === "self"}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const RecipeCard = ({
  imageUrl,
  name,
  handleRecipeCardClick,
  _id,
  actionsAllowed,
  onEdit,
  onDelete,
}) => (
  <div className="recipe-card" onClick={() => handleRecipeCardClick(_id)}>
    {actionsAllowed && (
      <div className="actions">
        <div className="action-icon">
          <EditOutlined
            style={{ color: "white", fontSize: 20 }}
            onClick={(e) => onEdit(e, _id)}
          />
        </div>
        <div className="action-icon">
          <DeleteOutlined
            style={{ color: "white", fontSize: 20 }}
            onClick={(e) => onDelete(e, _id)}
          />
        </div>
      </div>
    )}
    <img src={imageUrl} />
    <Title level={3}>{name}</Title>
  </div>
);

export default HomePage;

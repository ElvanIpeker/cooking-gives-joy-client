import { Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GETRECIPEBYID } from "../../../constants/apiEndpoints";
import { getRequest } from "../../../service/apiClient";
import "./styles.css";

const { Title } = Typography;

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    try {
      const {
        success,
        data: { recipe },
      } = await getRequest(GETRECIPEBYID(id));
      if (success) {
        const serverUrl = process.env.REACT_APP_API_URL;
        setRecipe({
          ...recipe,
          imageUrl: `${serverUrl}/images/${recipe?.file}`,
        });
      }
    } catch (err) {}
  };

  return (
    <div className="recipe-page-wrapper">
      <div className="inner">
        <Row style={{ height: "100%" }} gutter={[20, 20]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <img src={recipe?.imageUrl} />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <Title
              level={2}
              style={{ textTransform: "capitalize", marginTop: 0 }}
              className="orange-text"
            >
              {recipe?.name}
            </Title>
            <div>
              <Title level={5}>Origin</Title>
              <p>{recipe?.origin}</p>
            </div>
            <div>
              <Title level={5}>Cook Time</Title>
              <p>
                {recipe?.cookTime} {"mins"}
              </p>
            </div>
            <div>
              <Title level={5}>Ingredients</Title>
              <p>{recipe?.ingredients || "N/a"}</p>
            </div>
            <div>
              <Title level={5}>Instructions</Title>
              <p>{recipe?.instructions || "N/a"}</p>
            </div>
            <div>
              <Title level={5}>Serving</Title>
              <p>{recipe?.serving} Persons</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecipeDetailPage;

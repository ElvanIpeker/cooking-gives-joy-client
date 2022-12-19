import { Navigate } from "react-router-dom";
import { HomePage, AddRecipe, RecipeDetailPage } from "../pages/app";
import { DefaultLayout, AuthLayout } from "../layouts";
import LoginSignupPage from "../pages/auth/loginSignup";

const getRoutes = (isAuthenticated, requestedPath) => [
  {
    path: "auth",
    element: isAuthenticated ? <Navigate replace to={"/"} /> : <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginSignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage mode={"all"} />,
      },
      {
        path: "my-recipes",
        element: !isAuthenticated ? (
          <Navigate to={"/auth"} />
        ) : (
          <HomePage mode={"self"} />
        ),
      },
      {
        path: "recipe/:id",
        element: !isAuthenticated ? (
          <Navigate to={"/auth"} />
        ) : (
          <RecipeDetailPage mode={"self"} />
        ),
      },
      {
        path: "add-recipe",
        element: !isAuthenticated ? <Navigate to={"/auth"} /> : <AddRecipe />,
      },
      {
        path: "edit-recipe/:id",
        element: !isAuthenticated ? (
          <Navigate to={"/auth"} />
        ) : (
          <AddRecipe mode={"edit"} />
        ),
      },
    ],
  },
];

export default getRoutes;

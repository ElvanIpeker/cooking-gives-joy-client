// user

export const SIGNUP = "user/register",
  LOGIN = "user/login",
  // recipes

  GETALLRECIPES = "recipe",
  GETMYRECIPE = `recipe/user`,
  ADDRECIPE = "recipe/add",
  EDITRECIPE = (id) => `/recipe/edit?id=${id}`,
  GETRECIPEBYID = (id) => `recipe/recipe?id=${id}`,
  DELETERECIPE = (id) => `/recipe/delete?id=${id}`;

import express, { Router } from "express";

import { deleteUser, getAllUsers } from "../controllers/users";
import router from "router";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.delete("/users/:id", deleteUser);
};

import express, { Router } from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import router from "router";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.delete("/users/:id", deleteUser);
  router.patch("/users/:id", updateUser);
};

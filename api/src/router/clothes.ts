import express from "express";

import {
  createClothing,
  deleteClothing,
  getAllClothing,
  getOneClothing,
  updateClothing,
} from "../controllers/clothes";

export default (router: express.Router) => {
  router.get("/clothes", getAllClothing);
  router.get("/clothes/:id", getOneClothing);
  router.post("/clothes", createClothing);
  router.delete("/clothes/:id", deleteClothing);
  router.patch("/clothes/:id", updateClothing);
};

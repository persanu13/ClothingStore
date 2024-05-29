import express from "express";

import {
  createClothing,
  deleteClothing,
  getAllClothing,
  getOneClothing,
  updateClothingPatch,
  updateClothingPut,
} from "../controllers/clothes";

export default (router: express.Router) => {
  router.get("/clothes", getAllClothing);
  router.get("/clothes/:id", getOneClothing);
  router.post("/clothes", createClothing);
  router.delete("/clothes/:id", deleteClothing);
  router.patch("/clothes/:id", updateClothingPatch);
  router.put("/clothes/:id", updateClothingPut);
};

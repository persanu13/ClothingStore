import express from "express";

import authentication from "./authentication";
import users from "./users";
import clothes from "./clothes";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  clothes(router);
  return router;
};

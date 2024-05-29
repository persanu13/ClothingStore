import express from "express";

import {
  DeleteUserById,
  UpdateUserById,
  GetUsers,
  GetUsersById,
} from "../db/users";
import { IUser } from "models/user";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users: IUser[] = await GetUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser: IUser = await DeleteUserById(id);
    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res.sendStatus(400);
    }

    const updatedUser: IUser = await UpdateUserById(id, { username });

    if (!updatedUser) {
      return res.sendStatus(400);
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

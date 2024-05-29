import express from "express";
import { IClothing } from "../models/clothing";

import {
  GetClothes,
  GetClothingById,
  GetClothingByName,
  CreateClothing,
  DeleteClothing,
  UpdateClothing,
} from "../db/clothes";

export const getAllClothing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const clothes: IClothing[] = await GetClothes();
    return res.status(200).json(clothes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getOneClothing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const cloting: IClothing = await GetClothingById(id);

    if (!cloting) {
      return res.sendStatus(400);
    }

    return res.status(200).json(cloting);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createClothing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, category, gender, size, price } = req.body;
    if (!name || !category || !gender || !size || !price) {
      return res.sendStatus(400);
    }

    const existingClothing = await GetClothingByName(name);

    if (existingClothing) {
      return res.sendStatus(409);
    }

    const clothing = await CreateClothing({
      name,
      category,
      gender,
      size,
      price,
    });
    return res.status(200).json(clothing);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteClothing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const cloting: IClothing = await DeleteClothing(id);

    if (!cloting) {
      return res.sendStatus(400);
    }

    return res.status(200).json(cloting);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateClothing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { name, category, gender, size, price } = req.body;

    const existingClothing = await GetClothingByName(name);

    if (existingClothing) {
      return res.sendStatus(409);
    }

    const cloting: IClothing = await UpdateClothing(id, {
      name,
      category,
      gender,
      size,
      price,
    });

    if (!cloting) {
      return res.sendStatus(400);
    }

    return res.status(200).json(cloting);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

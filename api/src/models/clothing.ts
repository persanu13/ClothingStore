import { Document } from "mongoose";

export interface IClothing extends Document {
  _id: string;
  name: string;
  category: string;
  gender: string;
  size: string;
  price: number;
}

import mongoose from "mongoose";
import { IClothing } from "models/clothing";

const ClothingSchema = new mongoose.Schema<IClothing>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ClothingModel = mongoose.model("Clothing", ClothingSchema);

export const GetClothes = () => {
  return ClothingModel.find().select("-__v");
};

export const GetClothingById = (id: string) => {
  return ClothingModel.findById(id).select("-__v");
};

export const GetClothingByName = (name: string) => {
  return ClothingModel.findOne({ name }).select("-__v");
};

export const CreateClothing = async (values: Record<string, any>) => {
  const clothing = await new ClothingModel(values).save();
  return clothing.toObject({ versionKey: false });
};

export const DeleteClothing = (id: string) => {
  return ClothingModel.findByIdAndDelete(id).select("-__v");
};

export const UpdateClothing = (id: string, values: Record<string, any>) => {
  return ClothingModel.findByIdAndUpdate(id, values, { new: true }).select(
    "-__v"
  );
};

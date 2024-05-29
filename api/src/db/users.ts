import { IUser } from "models/user";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => {
  return UserModel.find().select("-__v");
};

export const getUsersByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  }).select("-__v");
};

export const getUsersById = (id: string) => {
  return UserModel.findById(id).select("-__v");
};

export const CreateUser = (values: Record<string, any>) => {
  return new UserModel(values).save().then((user: any) => {
    return user.toObject();
  });
};

export const DeleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id }).select("-__v");
};

export const UpdateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values).select("-__v");
};

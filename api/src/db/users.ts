import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  return UserModel.find();
};

export const getUsersByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const getUsersById = (id: string) => {
  return UserModel.findById(id);
};

export const CreateUser = (values: Record<string, any>) => {
  new UserModel(values).save().then((user: any) => {
    return user.toObject();
  });
};

export const DeleteUserById = (id: string) => {
  return UserModel.findOneAndDelete({ _id: id });
};

export const UpdateUserById = (id: string, values: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, values);
};

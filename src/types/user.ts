import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

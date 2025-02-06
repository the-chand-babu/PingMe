import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.send("Fetching list of users");
};

export const getUserProfile = (req: Request, res: Response) => {
  res.send("Fetching user profile");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("Deleting user");
};

export const updateUser = (req: Request, res: Response) => {
  res.send("Updating user");
};

export const createUser = (req: Request, res: Response) => {
  res.send("Creating user");
};

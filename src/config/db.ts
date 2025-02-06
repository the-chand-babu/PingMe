import mongoose from "mongoose";
const mongoUri = process.env.mongoDB_uri || "";

export const ConnnectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.log("error", error);
  }
};

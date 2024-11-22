import mongoose from "mongoose";
import config from "../config/config";

export default async function connectMongo() {
  return mongoose.connect(config.MONGODB_URI);
}

import mongoose from "mongoose";
import {MONGO_URI} from "./config.js";

try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("MongoDB connected"));
} catch (error) {
  console.log(error);
}

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    require: true,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  message: {
    type: String,
    require: true,
  },
  origin: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = mongoose.model("Log", logSchema);

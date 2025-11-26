import mongoose, { Schema, model, models } from "mongoose";

const EquipmentSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, default: "available" },
  description: { type: String },
}, { timestamps: true });

const Equipment = models.Equipment || model("Equipment", EquipmentSchema);

export default Equipment;
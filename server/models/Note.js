import mongoose from "mongoose"
const Schema = mongoose.Schema;

const Note = new Schema({
  content: { type: String, required: true },
  bugId: { type: String, required: true },
  reportedBy: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Note
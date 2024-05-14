import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  noteId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  date_created: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  action_items: {
    type: Array,
    required: true,
  },
});

const model = mongoose.model("notes", Schema);

export default model;

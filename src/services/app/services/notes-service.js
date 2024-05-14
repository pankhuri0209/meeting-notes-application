import Notes from "../models/notes.js";

/**
 *Search and return notes objects
 */

export const search = async (params = {}) => {
  const notes = await Notes.find(params).exec();
  return notes;
};
/**
 *Saves note object
 * @param {*} id
 * @returns
 */
export const save = async (note) => {
  const notes = new Notes(note);
  return await notes.save();
};
/**
 *Retrives a note object.
 * @param {*} keywords
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */

// Function to filter notes based on keywords and date range
export const filterNotes = async (keywords, startDate, endDate) => {
  debugger;
  const query = {
    $or: [
      { title: { $regex: keywords, $options: "i" } }, // Case-insensitive search in title
      { content: { $regex: keywords, $options: "i" } }, // Case-insensitive search in content
      { action_items: { $regex: keywords, $options: "i" } }, // Case-insensitive search in action items
    ],
    date_created: { $gte: startDate, $lte: endDate }, // Filter by date range
  };

  const notes = await Notes.find(query).exec();
  console.log(notes);
  return notes;
};

// Function to update a specific note
export const updateNote = async (noteId, updatedData) => {
  const updatedNote = await Notes.findByIdAndUpdate(noteId, updatedData, {
    new: true,
  }).exec();

  return updatedNote;
};

// Function to delete a specific note
export const deleteNote = async (noteId) => {
  await Notes.findByIdAndDelete(noteId).exec();
};

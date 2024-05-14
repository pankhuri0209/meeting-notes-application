import debug from "debug";
import * as notesService from "../services/notes-service.js";
import { setResponse, setError } from "./response-handler.js";

export const search = async (request, response) => {
  try {
    const params = { ...request.query };
    const notes = await notesService.search(params);
    setResponse(notes, response);
  } catch (error) {
    setError(error, response);
  }
};

export const post = async (request, response) => {
  try {
    const note = { ...request.body };
    const notes = await notesService.save(note);
    setResponse(notes, response);
  } catch (error) {
    setError(error, response);
  }
};

// Controller to handle filtering notes request
export const filterNotes = async (request, response) => {
  try {
    console.log("line 61");
    const { keywords, startDate, endDate } = request.query;
    const notes = await notesService.filterNotes(keywords, startDate, endDate);
    response.status(200).json(notes);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Controller to handle updating a specific note
export const updateNote = async (request, response) => {
  try {
    const { noteId } = request.params;
    const updatedNote = await notesService.updateNote(noteId, request.body);
    response.status(200).json(updatedNote);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Controller to handle deleting a specific note
export const deleteNote = async (request, response) => {
  try {
    const { noteId } = request.params;
    await notesService.deleteNote(noteId);
    response.status(204).send(); // No content response
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

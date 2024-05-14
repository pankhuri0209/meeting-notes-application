import express from "express";
import * as notesController from "../controllers/notes-controller.js";

const router = express.Router();

router.route("/").get(notesController.search).post(notesController.post);

//router.route("/:noteId").get(notesController.get);

// Route for filtering notes based on keywords and date ranges
router.route("/filter").get(notesController.filterNotes);

// Route for updating a specific note
router.route("/:noteId").put(notesController.updateNote);

// Route for deleting a specific note
router.route("/:noteId").delete(notesController.deleteNote);

export default router;

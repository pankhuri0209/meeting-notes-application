import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Note } from "../models/Note"; // Note interface or type defined

function CreateNote() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actionItem, setActionItem] = useState("");
  const [actionItems, setActionItems] = useState<string[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddActionItem = () => {
    if (actionItem.trim() !== "") {
      setActionItems([...actionItems, actionItem.trim()]);
      setActionItem("");
    }
  };

  const handleSave = () => {
    fetch("http://localhost:3001/notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        return response.json();
      })
      .then((data: Note[]) => {
        // Find the maximum noteId
        // Find the maximum noteId
        const maxNoteId = data.reduce((maxId: string, note: Note) => {
          return Math.max(
            parseInt(maxId, 10),
            parseInt(note.noteId.toString(), 10)
          ).toString();
        }, "0");

        // Generate new noteId by incrementing the maximum noteId
        const newNoteId = (maxNoteId + 1).toString().padStart(3, "0");

        // Construct the new note object
        const dateCreated = new Date().toLocaleDateString("en-US");
        const newNote = {
          title: title,
          date_created: dateCreated,
          noteId: newNoteId,
          content: content,
          action_items: actionItems,
        };

        // Send POST request to save the new note
        fetch("http://localhost:3001/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to save note");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Note saved successfully:", data);
            // Reset state
            setTitle("");
            setContent("");
            setActionItems([]);
            handleClose();
          })
          .catch((error) => {
            console.error("Error saving note:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleOpen}>
          Create Note
        </Button>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create New Note
          </Typography>
          <TextField
            id="note-title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            id="note-content"
            label="Content"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle1">Action Items:</Typography>
          {actionItems.map((item, index) => (
            <Typography key={index} variant="body1">
              - {item}
            </Typography>
          ))}
          <TextField
            id="action-item"
            label="Add Action Item"
            variant="outlined"
            fullWidth
            value={actionItem}
            onChange={(e) => setActionItem(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" onClick={handleAddActionItem}>
            Add Action Item
          </Button>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CreateNote;

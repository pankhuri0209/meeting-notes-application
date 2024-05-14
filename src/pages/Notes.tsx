import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Note } from "./../models/Note";

function Notes() {
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [refresh] = useState(false); // State to force re-render
  const [keywords, setKeywords] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleSearch = () => {
    // Format date strings
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Prepare query parameters
    const queryParams = new URLSearchParams({
      keywords,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    // Make API request
    fetch(`http://localhost:3001/notes/filter?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch filtered notes");
        }
        return response.json();
      })
      .then((data) => {
        setFilteredNotes(data);
      })
      .catch((error) => {
        console.error("Error fetching filtered notes:", error);
      });
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when component mounts
  }, [refresh]); // Include refresh in dependency array to re-fetch notes on re-render

  const fetchNotes = () => {
    fetch("http://localhost:3001/notes")
      .then((response) => response.json())
      .then((data) => setNoteData(data))
      .catch((error) => console.error("Error fetching notes:", error));
  };

  const handleExpandNote = (noteId: string) => {
    setExpandedNoteId((prevId) => (prevId === noteId ? null : noteId));
  };

  const handleEditNote = (noteId: string) => {
    setEditNoteId(noteId);
  };

  const handleSaveNote = (note: Note) => {
    console.log(note._id);
    fetch(`http://localhost:3001/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save note");
        }
        return response.json();
      })
      .then((data) => {
        setNoteData((prevData) =>
          prevData.map((prevNote) =>
            prevNote._id === note._id ? { ...prevNote, ...note } : prevNote
          )
        );
        setEditNoteId(null); // Exit edit mode
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  };

  const handleDeleteNote = (noteId: string) => {
    fetch(`http://localhost:3001/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete note");
        }
        setNoteData((prevData) =>
          prevData.filter((prevNote) => prevNote._id !== noteId)
        );
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: "20px", my: 4 }}
      >
        <TextField
          label="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {(filteredNotes.length > 0 ? filteredNotes : noteData).map((note) => (
        <Box key={note._id} sx={{ width: "40%" }}>
          <Card variant="outlined" sx={{ backgroundColor: "#FFF8DC " }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {editNoteId === note._id ? (
                  <TextField
                    id={`note-title-${note._id}`}
                    label="Title"
                    variant="standard"
                    fullWidth
                    value={note.title}
                    onChange={(e) =>
                      setNoteData((prevData) =>
                        prevData.map((prevNote) =>
                          prevNote._id === note._id
                            ? { ...prevNote, title: e.target.value }
                            : prevNote
                        )
                      )
                    }
                  />
                ) : (
                  note.title
                )}
              </Typography>
              <Typography variant="body1" component="p">
                {editNoteId === note._id ? (
                  <TextField
                    id={`note-content-${note._id}`}
                    label="Content"
                    multiline
                    rows={4}
                    variant="standard"
                    fullWidth
                    value={note.content}
                    onChange={(e) =>
                      setNoteData((prevData) =>
                        prevData.map((prevNote) =>
                          prevNote._id === note._id
                            ? { ...prevNote, content: e.target.value }
                            : prevNote
                        )
                      )
                    }
                  />
                ) : expandedNoteId === note._id ? (
                  note.content
                ) : (
                  note.content.split(" ").slice(0, 5).join(" ") + "..."
                )}
              </Typography>
              {expandedNoteId === note._id && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Action Items
                  </Typography>
                  {editNoteId === note._id ? (
                    note.action_items.map((actionItem, index) => (
                      <TextField
                        key={index}
                        id={`action-item-${note._id}-${index}`}
                        label={`Action Item ${index + 1}`}
                        variant="standard"
                        fullWidth
                        value={actionItem}
                        onChange={(e) =>
                          setNoteData((prevData) =>
                            prevData.map((prevNote) =>
                              prevNote._id === note._id
                                ? {
                                    ...prevNote,
                                    action_items: prevNote.action_items.map(
                                      (item, idx) =>
                                        idx === index ? e.target.value : item
                                    ),
                                  }
                                : prevNote
                            )
                          )
                        }
                      />
                    ))
                  ) : (
                    <ul>
                      {note.action_items.map((actionItem, index) => (
                        <li key={index}>{actionItem}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              <Typography variant="caption" color="text.secondary">
                Date Created: {note.date_created}
              </Typography>
            </CardContent>
            <CardActions>
              {editNoteId === note._id ? (
                <>
                  <Button size="small" onClick={() => handleSaveNote(note)}>
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setEditNoteId(null)} // Cancel editing
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="small" onClick={() => handleExpandNote(note._id)}>
                  {expandedNoteId === note._id ? "Read Less" : "Read More"}
                </Button>
              )}
              <Button size="small" onClick={() => handleEditNote(note._id)}>
                Edit
              </Button>
              <Button size="small" onClick={() => handleDeleteNote(note._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default Notes;

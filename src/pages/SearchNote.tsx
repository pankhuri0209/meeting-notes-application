// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";

// function SearchNote() {
//   const [keywords, setKeywords] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const handleSearch = () => {
//     // Perform search functionality here
//     console.log("Keywords:", keywords);
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", my: 4 }}>
//       <TextField
//         label="Keywords"
//         value={keywords}
//         onChange={(e) => setKeywords(e.target.value)}
//         variant="outlined"
//       />
//       <TextField
//         label="Start Date"
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//         variant="outlined"
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//         variant="outlined"
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <Button variant="contained" onClick={handleSearch}>
//         Search
//       </Button>
//     </Box>
//   );
// }

// export default SearchNote;

import { useState } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function SearchNote() {
  const [keywords, setKeywords] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [setFilteredNotes] = useState([]);

  // const formatDate = (dateString: string) => {
  //   const [year, month, day] = dateString.split("-");
  //   return `${month}/${day}/${year}`;
  // };

  // const handleSearch = () => {
  //   // Format date strings
  //   const formattedStartDate = formatDate(startDate);
  //   const formattedEndDate = formatDate(endDate);

  //   // Prepare query parameters
  //   const queryParams = new URLSearchParams({
  //     keywords,
  //     startDate: formattedStartDate,
  //     endDate: formattedEndDate,
  //   });
  //   console.log("Params:", queryParams.toString());

  //   // Make API request
  //   fetch(`http://localhost:3001/notes/filter?${queryParams}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch filtered notes");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Filtered notes:", data);
  //     //  setFilteredNotes(data);
  //       // Handle filtered notes data (display or store in state)
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching filtered notes:", error);
  //     });
  // };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", my: 4 }}>
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
      {/* <Button variant="contained" onClick={handleSearch}>
        Search
      </Button> */}
      {/* Render the filtered notes */}
      {
        // <ul>
        //   {filteredNotes.map((note) => (
        //     <li key={note.noteId}>
        //       <h3>{note.title}</h3>
        //       <p>{note.content}</p>
        //       <p>Action Items:</p>
        //       <ul>
        //         {note.action_items.map((item, index) => (
        //           <li key={index}>{item}</li>
        //         ))}
        //       </ul>
        //     </li>
        //   ))}
        // </ul>
      }
    </Box>
  );
}

export default SearchNote;

import "./App.css";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";
import NavBar from "./pages/NavBar";
// import SearchNote from "./pages/SearchNote";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <NavBar></NavBar>
          {/* <SearchNote></SearchNote> */}
          <Notes></Notes>
          <CreateNote></CreateNote>
        </Box>
      </Container>
    </>
  );
}

export default App;

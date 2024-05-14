import notesRouter from "./notes-route.js";

const initializeRoutes = (app) => {
  app.use("/notes", notesRouter);
};

export default initializeRoutes;

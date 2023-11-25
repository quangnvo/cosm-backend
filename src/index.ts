import express from "express";
import usersRouter from "./routes/users.routes";
import databaseService from "./services/database.services";
import { defaultErrorHandler } from "./middlewares/error.middlewares";

databaseService.connect();
const port = 3000;
const app = express();
app.use(express.json());
app.use("/users", usersRouter);

// Default error handler
app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

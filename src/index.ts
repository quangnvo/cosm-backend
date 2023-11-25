import express, { NextFunction, Request, Response } from "express";
import usersRouter from "./routes/users.routes";
import databaseService from "./services/database.services";

const port = 3000;
const app = express();
app.use(express.json());
app.use("/users", usersRouter);
databaseService.connect();

// Default error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Lỗi là: ", err.message);
  res.status(404).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

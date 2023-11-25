import express from "express";
import usersRouter from "./routes/users.routes";
import databaseService from "./services/database.services";

const port = 3000;
const app = express();
app.use(express.json());
app.use("/users", usersRouter);
databaseService.connect();

app.use((err, req, res, next) => {
  console.log("Lỗi là: ", err.message);
  res.status(404).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

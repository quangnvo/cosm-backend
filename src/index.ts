import express from "express";
import usersRouter from "./routes/users.routes";

const app = express();
app.use(express.json());

const port = 3000;

// Users
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

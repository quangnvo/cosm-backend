import { Router } from "express";

const usersRouter = Router();

usersRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

usersRouter.get("/tweet", (req, res) => {
  res.send("Hello aaaaaa!");
});

export default usersRouter;

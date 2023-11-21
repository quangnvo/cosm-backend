import express from "express";

const app = express();
const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

userRouter.get("/tweet", (req, res) => {
  res.send("Hello aaaaaa!");
});

export default userRouter;

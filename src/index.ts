import express from "express";

const app = express();
const router = express.Router();

const port = 3000;

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

router.get("/tweet", (req: any, res: any) => {
  res.send("Hello aaaaaa!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

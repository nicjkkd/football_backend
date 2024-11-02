import express from "express";
import dotenv from "dotenv";
import routes from "./routers/index";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).send("Hello, TypeScript Node Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import routes from "./routers/index";
import cors from "cors";
import { WebSocketServer } from "ws";
import { Worker } from "worker_threads";
import path from "path";
import { fibonacci } from "./utils";
dotenv.config();

const HTTP_SERVER_PORT = process.env.HTTP_SERVER_PORT || 3000;
const WS_SERVER_PORT = parseInt(process.env.WS_SERVER_PORT || "8080");

const app = express();
app.use(cors());
app.use(express.json());

const workerCode = `
require("ts-node/register");
require("${path.resolve(__dirname, "./worker.ts")}");
`;
const worker = new Worker(workerCode, { eval: true });

app.get("/worker", (req, res) => {
  worker.postMessage(45);
  worker.once("message", (result: number) => {
    res
      .status(201)
      .send(`Число Фібоначчі: ${result ? result : null}, час виконання:  мс`);
  });
});

app.get("/no-worker", (req, res) => {
  const startTime = Date.now();
  const result = fibonacci(45);
  const endTime = Date.now();
  res
    .status(201)
    .send(
      `Число Фібоначчі: ${result}, час виконання: ${endTime - startTime} мс`
    );
});

app.get("/health", (req, res) => {
  res.status(200).send("Hello, TypeScript Node Express!");
});

app.listen(HTTP_SERVER_PORT, () => {
  console.log(`Server is running on port ${HTTP_SERVER_PORT}`);
});

let iterator = 0; // need to count all users connected at the moment
const wss = new WebSocketServer(
  {
    port: WS_SERVER_PORT,
  },
  () => {
    console.log(`WebSocket server is running on port ${WS_SERVER_PORT}`);
  }
);

const handleError = (error: Error) => {
  console.error("WebSocket Server Error:", error);
};

wss.on("error", (error) => handleError(error));

wss.on("connection", (ws) => {
  iterator++;

  console.log("New Client. It is ", iterator, " clients");

  ws.on("close", () => {
    console.log(`Client ${iterator} disconnected`);
    iterator--;
  });

  ws.on("error", (error) => handleError(error));

  ws.on("message", (data, isBinary) => {
    try {
      const parsedData = JSON.parse(data.toString());
      // console.log("received: ", parsedData);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    } catch (error) {
      console.error("Invalid JSON:", error);
      ws.send(JSON.stringify({ error: "Invalid message format" }));
    }
  });
});

const broadcast = (data: string) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

app.use(routes(broadcast));

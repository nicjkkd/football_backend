import express from "express";
import dotenv from "dotenv";
import routes from "./routers/index";
import cors from "cors";

dotenv.config();

const HTTP_SERVER_PORT = parseInt(process.env.HTTP_SERVER_PORT || "3000");
const WS_SERVER_PORT = parseInt(process.env.WS_SERVER_PORT || "8080");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Hello, TypeScript Bun Express!");
});

app.listen(HTTP_SERVER_PORT, () => {
  console.log(`Server is running on port ${HTTP_SERVER_PORT}`);
});

let iterator = 0;
const wsServer = Bun.serve<{
  clientId: number;
}>({
  port: WS_SERVER_PORT,

  fetch(req, server) {
    const upgraded = server.upgrade(req, {
      data: { clientId: ++iterator },
    });

    if (upgraded) return;
    return new Response("WebSocket upgrade failed", { status: 500 });
  },

  websocket: {
    open(ws) {
      console.log(`New Client. It is ${iterator} clients`);
      ws.subscribe("broadcast");
    },

    message(ws, message) {
      try {
        const messageStr =
          typeof message === "string"
            ? message
            : Buffer.from(message).toString();

        wsServer.publish("broadcast", messageStr);
      } catch (error) {
        console.error("Invalid JSON:", error);
        ws.send(JSON.stringify({ error: "Invalid message format" }));
      }
    },

    close(ws) {
      iterator--;
      console.log(`Client ${ws.data.clientId} disconnected`);
      ws.unsubscribe("broadcast");
    },
  },
});

const broadcast = (data: string) => {
  wsServer.publish("broadcast", data);
};

app.use(routes(broadcast));

console.log(`WebSocket Server running on ws://localhost:${WS_SERVER_PORT}`);

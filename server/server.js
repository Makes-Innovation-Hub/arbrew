import path from "path";
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

import { WebSocket, WebSocketServer } from "ws";
import { fileURLToPath } from "url";
import routes from "./routes.js";
import connectDB from "./config/db.js";
import { checkProfanity, translateMsg } from "./api/translation/openAI.js";

import { PROFANITY_MSG_HE } from "./utils/constants.js";
import { PROFANITY_MSG_AR } from "./utils/constants.js";
import Chat from "./api/chat/chat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + "/.env" });

const wss = new WebSocketServer({ port: process.env.WEB_SOCKET_PORT });

const app = express();
app.use(express.json());

connectDB();

let clients = [];
let room = 1;

wss.on("connection", (ws) => {
  ws.room = room;
  room++;

  clients.push({ room: ws.room, client: ws });
  ws.on("message", async (dataBuffer) => {
    const data = JSON.parse(dataBuffer.toString());

    // console.log("before fetch");
    const res = await fetch(
      `http://localhost:5090/api/chat/${data.sender}/${data.receiver}`
    );
    // console.log("after fetch");

    // console.log("res", res);
    // const chatHistory = await res.json();
    // console.log("typeof res.status", typeof res.status);

    // console.log("chatHistory", chatHistory);
    if (res.status === 200) {
      //return to the client the message history array
      const chat = await res.json();
      const chatHistory = chat.messagesHistory;
      ws.send(JSON.stringify(chatHistory));
    } else if (typeof ws.room === "number" && data.msg === "open room") {
      ws.room = data.sender + "_" + data.receiver;
      clients.push({ room: ws.room, client: ws });
      //save chatting users in DB
      const url = `http:localhost:${process.env.PORT}/api/chat/${data.sender}/${data.receiver}`;
      const headers = {
        "Content-Type": "application/json",
      };

      const options = {
        method: "POST",
        headers: headers,
      };

      try {
        const response = await fetch(url, options);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      const completeData = { ...data, room: ws.room };
      const originalMsg = completeData.msg;
      const translatedMsg = await translateMsg(
        completeData.msg,
        completeData.originalLang,
        completeData.targetLang
      );
      const isProfanity = await checkProfanity(completeData.msg);

      console.log("originalMsg", originalMsg);
      console.log("translatedMsg", translatedMsg);
      console.log("isProfanity", isProfanity);

      clients.forEach(async (client) => {
        const isSameRoom =
          client.room === completeData.sender + "_" + completeData.receiver ||
          client.room === completeData.receiver + "_" + completeData.sender;
        if (
          isSameRoom &&
          !isProfanity &&
          client.client.readyState === WebSocket.OPEN
        ) {
          //save originalMsg & translatedMsg in DB
          const url = `http:localhost:${process.env.PORT}/api/chat/${completeData.sender}/${completeData.receiver}`;
          const headers = {
            "Content-Type": "application/json",
          };

          const body = {
            contentOriginal: originalMsg,
            contentTranslated: translatedMsg,
          };

          const options = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
          };

          try {
            const response = await fetch(url, options);
          } catch (error) {
            console.error("Error:", error);
          }
          completeData["translated"] = translatedMsg;
          client.client.send(JSON.stringify(completeData));
        } else if (
          isSameRoom &&
          isProfanity &&
          client.client.readyState === WebSocket.OPEN
        ) {
          ws.send(
            completeData.originalLang === "hebrew"
              ? PROFANITY_MSG_HE
              : PROFANITY_MSG_AR
          );
        }
      });
    }
  });
  ws.on("close", () => {
    console.log(" User Disconnected ");
  });
  ws.onerror = function () {
    console.log("Some Error ocurred ");
  };
});

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5050;

const server = app.listen(
  PORT,
  console.log(
    `📶 server is running in ${process.env.NODE_ENV} Mode, & made on port ${PORT} 📶`
  )
);

process.on("unhandledRejection", async (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
  await wss.close();
});

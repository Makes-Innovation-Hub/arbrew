import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import connectDB from "./config/db.js";
import { CheckAndTranslateMsg } from "./utils/chat_socketIo.js";
import {
  access_chatCollection,
  addMessageToChat,
} from "./utils/chat_socketIo.js";
import { requestLogger } from "./middleware/logger.js";
import ChatCollection from "./models/chat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use(requestLogger);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api", routes);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

const PORT = process.env.PORT || 5050;

const server = app.listen(
  PORT,
  console.log(
    `📶 server is running in ${process.env.NODE_ENV} Mode, & made on port ${PORT} 📶`
  )
);

const socket_io = new Server(server, {
  // pingTimeout: 120000000,
  cors: {
    origin: "*",
  },
});

socket_io.on("connection", (socket) => {
  console.log("🟢🟢 Socket.io is active 🟢🟢");
  socket.on("room_setup", (chatData) => {
    if (!chatData.chatId) return;
    const { chatId } = chatData;
    socket.join(chatId);
  });

  socket.on("new_message", (message, chatId, sender, receiver) => {
    CheckAndTranslateMsg(
      message,
      sender?.userDetails.nativeLanguage,
      receiver?.userDetails.nativeLanguage
    )
      .then(async (result) => {
        if (result.isProfanity)
          return socket.to(chatId).emit("send_message", result);
        const { translatedMsg } = result;
        const chat = await ChatCollection.findById(chatId);
        let newMessage = {
          sender: sender.id,
          originalContent: message,
          date: new Date(),
          translatedContent: translatedMsg,
        };
        chat.messages.push(newMessage);
        await chat.save();
        socket
          .to(chatId)
          .emit("send_message", chat.messages[chat.messages.length - 1]);
      })
      .catch((err) => console.error(err));
  });
  socket.on("disconnect", (data) => console.log(data));
});
process.on("unhandledRejection", async (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

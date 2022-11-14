import express from "express";
import cors from "cors";
import "./db.js";
import { Server } from "socket.io";
import { createServer } from "http";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = join(__dirname, "../client/dist");

//custom imports
import { PORT } from "./config.js";

//import routes
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/messages.routes.js";

const app = express();
const server = createServer(app);
//midlewares
app.use(express.static(__public));
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);

app.get("/app", (req, res)=>{
  res.sendFile(join(__public, "index.html"));
})

//routes
server.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: `https://sockets-react.up.railway.app/`,
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sm", (data) => {
    const { from, to, message } = data;
    const sendUserSocket = onlineUsers.get(to);
    let inn = "no entro"
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-recieve", message);
      inn = "entro"
    }
  });
});

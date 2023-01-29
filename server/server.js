import messageRoutes from "./routes/messages.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import AIBot from "./aiBot/AIBot.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.SERVERPORT || 5000;

// db
mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGO_URI
      ? process.env.MONGO_URI
      : "mongodb+srv://joaobernardino:joaobernardinoaibot@cluster0.j4n3vjn.mongodb.net/AiBot?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));
app.use(cors());
app.use(express.json());
// router middleware
app.use("/api", messageRoutes);

app.listen(port, () => console.log(`listening on port ${port}!`));

//initialize bot answers, if nothing is passed to it all categories saved on mongoDB are loaded. But you can pass an array if you want to
//specify the categories that the bot will use
export const aiBotInstance = new AIBot();
await aiBotInstance.gatherData();
aiBotInstance.initBotMessages();

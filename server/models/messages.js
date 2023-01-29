import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  topic: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
  category: {
    type: String,
    trim: true,
    maxLength: 32,
  },
  messages: {
    type: [
      {
        subject: String || null,
        bot: [String],
        user: [String],
      },
    ],
  },
});

export default mongoose.model("Messages", messagesSchema);

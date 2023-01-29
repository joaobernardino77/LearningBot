import { aiBotInstance } from "../server.js";

export const getInitialMessage = async (req, res) => {
  try {
    return res.send(aiBotInstance.getInitialMessage());
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Bot is not able to respond at the moment, please try again later",
    });
  }
};

export const receiveMessage = async (req, res) => {
  try {
    const { message } = req.body;

    //in case the user message was not passed properly by the client
    if (!message) {
      return res.json({
        error:
          "Bot is not able to respond at the moment, please try again later",
      });
    }

    //send bot response or in case no response was found send a not found message
    return res.send(aiBotInstance.receiveMessage(message));
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Bot is not able to respond at the moment, please try again later",
    });
  }
};

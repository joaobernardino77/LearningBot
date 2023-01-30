import messages from "../models/messages.js";
import { createHelpers } from "./helpers.js";
import { adjustStringToSearch } from "../generic/generic.js";

const greetingMessage =
  "Welcome to Learning AI Bot, no learning topics are loaded at the moment but you can say hi :)";
const greetingMessageWithTopics =
  "Welcome to Learning AI Bot, you can start by typing 'topics' if you want to know what topics are available for you to learn today. ";

// AIBot core
export default class AIBot {
  constructor(categories = null) {
    this.loadedTopics = categories;
    this.botMessages = {};
    this.topics = [];
  }

  async gatherData() {
    this.data = await messages
      .find()
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return res.json(err);
      });
    if (this.loadedTopics) {
      this.data = this.data.filter((d) => {
        return d.category !== "learning" || this.loadedTopics.includes(d.topic);
      });
    }
  }

  initBotMessages() {
    //if we passed the categories to this init function, only those categories

    if (this.data.length === 0) {
      console.error("no messages were added");
      return;
    }
    //for all categories wanted
    this.data.forEach((d) => {
      //adjust topic that is going to be used as search key to retrieve bot response
      //since topics are just for learning categories we don't want to do this for the other categories
      if (d.category === "learning") {
        d.topic = adjustStringToSearch(d.topic);
      }

      //update the topics array if it is a new topic from the learning category
      this.buildTopics(d.topic, d.category);

      //get all the messages
      d.messages.forEach((m) => {
        //adjust subject that is going to be used as search key to retrieve bot response
        //since subjects are just for learning categories we don't want to do this for the other categories
        if (d.category === "learning") {
          m.subject = adjustStringToSearch(m.subject);
        }

        m.user.forEach((u) => {
          //adjust each user message that is going to be used as search key to retrieve bot response
          u = adjustStringToSearch(u);

          this.buildSubjects(m.subject, d.topic, d.category);
          this.botMessages[u] = { bot: m.bot, subject: m.subject };
        });
      });
    });
    this.botMessages = createHelpers(this.botMessages, this.topics);
  }

  buildTopics(topic, category) {
    if (!this.topics.includes(topic) && category === "learning") {
      this.topics.push({ name: topic, subjects: [] });
      this.botMessages[topic] = `${topic} helper`;
    }
  }

  buildSubjects = (subject, topic, category) => {
    if (category !== "learning") return;

    const topicObj = this.topics.find((t) => {
      return t.name === topic;
    });

    if (topicObj && topicObj.subjects && !topicObj.subjects.includes(subject)) {
      topicObj.subjects.push(subject);
    }
  };

  getInitialMessage() {
    //if bot doesn't have a message tell user that it is unavailable at the moment
    if (Object.keys(this.botMessages).length === 0) {
      return {
        error:
          "Bot is not able to respond at the moment, please try again later",
      };
    }
    //send the greeting message, if there is not one define it will send the default one
    return {
      message:
        this.topics.length === 0 ? greetingMessage : greetingMessageWithTopics,
    };
  }

  receiveMessage(message) {
    //in case the user message was not passed properly by the client
    if (!message) {
      return {
        error:
          "Bot is not able to respond at the moment, please try again later",
      };
    }
    return {
      botResponse: this.getRandomResponse(
        this.botMessages[adjustStringToSearch(message)]
      ),
      userMessage: message,
    };
  }

  getRandomResponse(messageArray) {
    if (!messageArray) return "Sorry can't understand you";
    //in case the is only one answer just display it
    return Array.isArray(messageArray.bot)
      ? messageArray.bot[Math.floor(Math.random() * messageArray.bot.length)]
      : messageArray.bot;
  }
}

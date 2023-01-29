//here are the functions that will add to the bot the help responses so user can easily reach the content

export const createHelpers = (botMessages, topics) => {
  botMessages["topics"] = {
    bot: "The following are the available topics to learn at the moment: ",
  };
  topics.forEach((t) => {
    botMessages["topics"].bot += `'${t.name}' `;
    botMessages = buildSubjectsHelper(botMessages, t);
  });
  botMessages["topics"].bot +=
    ". if you want more information on what subjects a topic have just type the topic name";

  return botMessages;
};

const buildSubjectsHelper = (botMessages, topic) => {
  botMessages[topic.name] = {
    bot: "The subjects available to learn on this topic are: ",
  };
  topic.subjects.forEach((s) => {
    botMessages[topic.name].bot += `'${s}' `;
    botMessages[s] = {
      bot: `if you want to know what questions are available to access on this subject type the following '${s} questions'`,
    };
    botMessages[`${s} questions`] = {
      bot:
        "the questions available for this subject are: " +
        Object.keys(botMessages)
          .filter((m) => {
            return botMessages[m].subject === s;
          })
          .toString(),
    };
  });
  botMessages[topic.name].bot +=
    ". if you want more information on what subjects a topic have just type the subject name";

  return botMessages;
};

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import "./MessageArea.css";
import Message from "./Message";
import UserInput from "./UserInput";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const MessageArea = () => {
  const bottomRef = useRef(null);

  const [messageList, setMessageList] = useState([]);
  const [messageBouncer, setMessageBouncer] = useState(true);

  useEffect(() => {
    const fetchNextBotMessage = async (userMessage) => {
      try {
        const { data } = await axios.post(`/receive-message`, {
          message: userMessage,
        });
        if (data?.error) {
          toast.error(data.error);
          setMessageBouncer(false);
        } else {
          setMessageBouncer(false);
          submitMessage("bot", data.botResponse);
        }
      } catch (err) {
        toast.error("Bot not working at the moment");
      }
    };
    //if last message is a user message we need to get a bot message to reply
    if (
      messageList.length > 0 &&
      messageList[messageList.length - 1].userType === "user"
    ) {
      fetchNextBotMessage(messageList[messageList.length - 1].messageText);
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList]);

  //load first bot message
  useEffect(() => {
    const getInitialMessage = async () => {
      try {
        const { data } = await axios.get(`/initial-message/`);
        if (data?.error) {
          toast.error(data.error);
          setMessageBouncer(false);
        } else {
          const { message } = data;
          setMessageBouncer(false);
          submitMessage("bot", message);
        }
      } catch (err) {
        toast.error("Bot not working at the moment");
      }
    };
    getInitialMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitMessage = (userType, message) => {
    if (userType === "user") setMessageBouncer(true);

    setMessageList([
      ...messageList,
      {
        messageText: message,
        userType: userType,
        createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}`,
      },
    ]);
  };

  return (
    <Grid className="MessageListMain" container direction="column" spacing={0}>
      <Grid item className="MessageListHeader" xs={1}>
        <FontAwesomeIcon
          icon={faRobot}
          style={{
            height: "40px",
            width: "40px",
            color: "white",
            marginRight: "20px",
            marginLeft: "60px",
          }}
        />
        <div>Learning AI BOT</div>
      </Grid>
      <Grid item className="MessageListChatArea" xs={10}>
        {messageList.map((message, idx) => (
          <Message
            key={`message${idx}`}
            createdAt={message.createdAt}
            messageText={message.messageText}
            userType={message.userType}
          />
        ))}
        {messageBouncer && (
          <Message messageText="" userType="bot" messageLoader={true} />
        )}
        <div ref={bottomRef} />
      </Grid>
      <Grid item xs={1} style={{ position: "relative" }}>
        {!messageBouncer && <UserInput submitMessage={submitMessage} />}
      </Grid>
    </Grid>
  );
};

export default MessageArea;

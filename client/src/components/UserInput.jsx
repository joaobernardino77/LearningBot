import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import "./UserInput.css";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";

const UserInput = ({ submitMessage }) => {
  const [userMessage, setUserMessage] = useState("");

  const submitAndResetInput = () => {
    if (userMessage.trim() === "") {
      return toast.error("Can't send an empty message");
    }
    submitMessage("user", userMessage);
    setUserMessage("");
  };

  return (
    <div className="user-input">
      <TextField
        variant="outlined"
        value={userMessage}
        autoFocus={true}
        placeholder="message"
        style={{ width: "100%" }}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            submitAndResetInput();
            ev.preventDefault();
          }
        }}
        InputProps={{
          style: {
            fontSize: "1.2rem",
            height: "100%",
            width: "100%",
            borderRadius: "0px 0px 14px 14px",
            backgroundColor: "lightskyblue",
            backgroundImage: "linear-gradient(to right, #37abc8ff, #9955ffff)",
            color: "white",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => {
                  submitAndResetInput();
                }}
              >
                <SendIcon style={{ color: "white" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default UserInput;

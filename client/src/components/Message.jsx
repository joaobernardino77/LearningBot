import "./Message.css";
import BouncerMessageLoader from "../generic/BouncerMessageLoader";
import Avatar from "@mui/material/Avatar";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const Message = ({
  userType,
  createdAt,
  messageText,
  messageLoader = false,
}) => {
  return (
    <>
      <div className={`message-row ${userType}-message`}>
        <div className="message-content">
          {messageLoader ? (
            <div className="message-text">
              <BouncerMessageLoader />
            </div>
          ) : (
            <div className="message-text">
              <div style={{ display: "inline-flex" }}>
                {userType === "bot" ? (
                  <SmartToyIcon
                    style={{ height: "40px", width: "40px", color: "white" }}
                  />
                ) : (
                  <Avatar />
                )}
              </div>
              <div>{messageText}</div>
            </div>
          )}
          {!messageLoader && <div className="message-time">{createdAt}</div>}
        </div>
      </div>
    </>
  );
};

export default Message;

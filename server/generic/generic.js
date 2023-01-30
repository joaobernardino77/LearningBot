//change content to be more easy to access
export const adjustStringToSearch = (message) => {
  return message.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
};

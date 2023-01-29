export const removeSpecialCharacters = (message) => {
  return message.replace(/[^a-zA-Z ]/g, "").toLowerCase();
};

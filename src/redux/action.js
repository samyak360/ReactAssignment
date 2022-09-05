export const updateActiveUser = (id) => (dispatch, getState) => {
  const users = getState().users;
  const activeUser = users[id];
  dispatch({ type: "UPDATE ACTIVE USER", payload: activeUser });
};

export const updateCurrentUser = (id) => (dispatch, getState) => {
  const users = getState().users;
  const currentUser = users[id];
  dispatch({ type: "UPDATE CURRENT USER", payload: currentUser });
};

export const updateChats = (inputMessage) => (dispatch, getState) => {
  const { currentUser, activeUser, chats } = getState();
  if (chats[currentUser.chatId + "-" + activeUser.chatId]?.length) {
    chats[currentUser.chatId + "-" + activeUser.chatId].push(inputMessage);
  } else if (chats[activeUser.chatId + "-" + currentUser.chatId]?.length) {
    chats[activeUser.chatId + "-" + currentUser.chatId]?.push(inputMessage);
  } else {
    chats[currentUser.chatId + "-" + activeUser.chatId]?.push(inputMessage);
  }
  dispatch({ type: "UPDATE CHATS", payload: chats });
};

export const updateFirstTimeChat = (chatId) => (dispatch, getState) => {
  const chats = getState().chats;

  chats[chatId] = [];
  dispatch({ type: "UPDATE FIRST TIME CHAT", payload: chats });
};

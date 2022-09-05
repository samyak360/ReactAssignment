import { createStore } from "redux";

import thunk from "redux-thunk";
import { usersData, chats } from "../data/data";
import { reducer } from "./reducer";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const preloadedState = {
  users: usersData,
  currentUser: usersData[0],
  activeUser: usersData[1],
  chats: chats,
};

const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

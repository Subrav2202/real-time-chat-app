import { combineReducers } from "redux";
import { userRedcuer } from "./user/userReducer";
import { chatRedcuer } from "./chat/chatReducer";

export const rootReducer = combineReducers({
  user: userRedcuer,
  chat: chatRedcuer,
});

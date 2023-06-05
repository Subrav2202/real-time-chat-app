import { GET_CHAT_HISTORY } from "./chatType";
import * as api_url from "../../helpers/apiUpls";
import { axiosApi } from "../../helpers/axiosApi";

export const getChatHistory = (id) => {
  return async (dispatch) => {
    try {
      const res = await axiosApi.get(`${api_url.chathistory}?senderId=${id}`);
      dispatch({ type: GET_CHAT_HISTORY, payload: res?.data?.data });
    } catch (error) {
      console.log(error);
    }
  };
};

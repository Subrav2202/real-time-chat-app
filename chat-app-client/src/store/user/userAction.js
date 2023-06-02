import { REGISTER_USER, LOGIN_USER } from "./userType";
import { axiosApi } from "../../helpers/axiosApi";
import * as api_url from "../../helpers/apiUpls";

export const registerUser = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const res = await axiosApi.post(api_url.register, payload);

      //   dispatch(REGISTER_USER, res.data);
    } catch (error) {
      console.log(error);
    }
  };
};
export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      console.log({ payload });
      const res = await axiosApi.post(api_url.login, payload);
      console.log({ res });
      dispatch({ type: LOGIN_USER, payload: res?.data?.data });
      console.log(res?.data?.data?.accessToken);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken ?? "");
    } catch (error) {
      console.log(error);
    }
  };
};

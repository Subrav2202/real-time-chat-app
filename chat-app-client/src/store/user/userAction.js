import { REGISTER_USER } from './userType'
import axios_api from "../../helpers/axiosApi";
import api_url from "../../helpers/apiUpls";

export const registerUser = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios_api.post(api_url.register,payload)
            dispatch(REGISTER_USER, res.data)
        } catch (error) {
            console.log(error)
        }
    }
}
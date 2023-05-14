
import { loginFailure, loginStart, loginSuccess, signupStart, signupSuccess, signupFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const signup = async(dispatch, user) => {
    dispatch(signupStart());
    try{
        const res = await publicRequest.post("/auth/register", user);
        dispatch(signupSuccess());
        alert(res.data);
    }catch(err){
        dispatch(signupFailure());
    }
}

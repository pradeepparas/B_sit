import axios from 'axios';
import * as API from '../../constants/APIs';
import * as myConstClass from '../../screens/constants/constants';
import * as actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';
import { setIsLoading, setIsSubmitted } from "./stationActions";
// import { useHistory } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const api_url = myConstClass.apiUrl;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user_data, message) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        authData: user_data,
        message: message
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (username, password) => {

    return async dispatch => {
        let a = await dispatch(setIsLoading(true))
        var qs = require('qs');
        debugger
        // dispatch(authStart());
        const authData = {
            username: username,
            password: password
        }

        var data = qs.stringify(authData);
           var config = {
             method: 'post',
             url: API.LoginAPI,
             headers: {
            //    'Accept-Language': 'hi',
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data : data
           };

        axios(config)
            .then(response => {
                debugger
                if(response.data.success){
                    debugger
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', response.data.user_data.name)
                    localStorage.setItem('userId', response.data.user_data._id);
                    localStorage.setItem('userDataLS', JSON.stringify(response.data.user_data))
                    console.log(response.data.user_data)
                    debugger
                    // localStorage.setItem('user', user));
                    dispatch(authSuccess(response.data.token, response.data.user_data, response.data.message));
                    toast.success(response.data.message)
                } else {

                }
            }).then(() => {
                dispatch(setIsLoading(false))
            })
            .catch(err => {
                toast.error(err.response.data.message)
                dispatch(setIsLoading(false))
                // dispatch(authFail({
                //     error: err.message ? err.message : null
                // }));
            });

    };
};

// export const changeProfileSetting = (profile) => {
//   return async dispatch => {
//     let a = await dispatch(setIsLoading(true))
//   }
// }

export const changeProfileOrPassword = (profile, type) => {
    return async dispatch => {
        let a = await dispatch(setIsLoading(true))
        let data = type=='1' ? {
            name: profile.firstName + " " + profile.lastName,
            mobile: profile.phoneNumber,
            email: profile.emailAddress
        } :
        {
            current_password: profile.currentPassword,
            new_password: profile.newPassword,
            confirm_password: profile.confirmPassword
        }
        axios({
            method: "PUT",
            url: type=='1' ? `${API.UpdateProfileAPI}/${profile._id}` : API.ChangePasswordAPI,
            data: data,
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              }
        }).then(response => {
            if(response.data.success){
                // toast.success(response.data.message)
                dispatch(setIsLoading(false))
                dispatch(setIsSubmitted(true))
                localStorage.setItem('token', response.data.token)
            } else {

            }
        }).catch(err => {
            toast.error(err.response.data.message)
            dispatch(setIsLoading(false))
            dispatch(setIsSubmitted(false))
        })
    }
}

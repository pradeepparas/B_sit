import * as actionTypes from './actionTypes';
import * as API from '../../constants/APIs';
import axios from 'axios';
// import moment from 'moment';
import { toast } from 'react-toastify';
import { setIsSubmitted, setIsLoading } from './stationActions';
import { mapProps } from 'recompose';
// export function userActions(user) {
//   return {
//     type: actionTypes.ADD_USER,
//     user: user
//   };
// }

export function userActions(details) {
  return async dispatch => {
    let a = await dispatch(setIsLoading(true))
    debugger
    console.log(details)
    debugger
    const data = {
      "name": details.userName,
      // "email": details.userEmail,
      "mobile": details.userNumber,
      "station_id": details.stationName,
      "role": details.role,
      "password": details.userPassword
    }
    if(details.userEmail)data.email= details.userEmail;

    axios({
      method: 'post',
      url: API.AddUserAPI,
      headers: { 
      //  'Accept-Language': 'hi',
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      data : JSON.stringify(data)
    }).then(response => {
      if(response.data.success){
        dispatch(setIsSubmitted(true))
        console.log(response)
      } else {
        debugger
      }
      dispatch(setIsLoading(false))
    }).catch((response) => {
      // debugger
      toast.error(response.response.data.message)
      dispatch(setIsSubmitted(false))
      dispatch(setIsLoading(false))
    })
    
  }
}

export function EditUserDetails(details) {
  return async dispatch => {
    let a = await dispatch(setIsLoading(true))
    console.log(details)
    debugger
    // return
    let data = {
        "name": details.userName,
        // "email": details.userEmail,
        "mobile": details.userNumber,
        "station_id": details.stationName,
        "role": details.role
    }
    if(details.userEmail)data.email= details.userEmail;
    
    let UpdateUser = `${API.GetUserAPI}/${details._id}`;

    axios({
      url: UpdateUser,
      method: "PUT",
      data: data,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      if(response.data.success){
        dispatch(setIsSubmitted(true))
      } else {
        dispatch(setIsSubmitted(false))
      }
      dispatch(setIsLoading(false))
    }).catch(err => {
      toast.error(err.response.data.message)
      dispatch(setIsSubmitted(false))
      dispatch(setIsLoading(false))
    })
    
  }
}

export function setUserData(user) {
  return {
    type: actionTypes.EDIT_USER,
    data: user
  };
}

export function getUserDataByParams(page, limit, values, type) {
  debugger
  return async (dispatch) => {
    let a = await dispatch(setIsLoading(true))
    console.log(a)
    debugger
    let type1 = type ? type: '';

    debugger
    let url = values ? `${API.GetUserAPI}/${page}/${limit}?search=${values.name}&station_id=${values.station_name}&type=${type1}&role_id=${values.role}&start_date=${values.start_date}&end_date=${values.end_date}`
        : `${API.GetUserAPI}/${page}/${limit}?type=${type1}`; 
    debugger
    axios({
      url: url,
      headers: {
        "accept": "application/json",
        // "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    }).then(response => {
      debugger
      if(response.data.success){
        debugger
        dispatch(fetchUserDataByParams(response.data.user.docs, response.data.user.total, response.data.user.limit))
      } else {
        dispatch(fetchUserDataByParams([]))
      }
      dispatch(setIsLoading(false))
    }).catch(err => {
      console.log(err.response.data.message)
      debugger
      if(err.response.data.message == 'No Record Found'){
        dispatch(fetchUserDataByParams([]))
      }
      dispatch(setIsLoading(false))
    })
  }
}

export function fetchUserDataByParams(docs, total, limit) {
  return {
    type: actionTypes.FETCH_USER_BYPARAMS,
    docs: docs,
    total: total,
    limit: limit
  }
}

export function setIsEditFalse(value) {
  return {
    type: actionTypes.SET_ISADD,
    value: value
  }
}

export function deleteUser(userId) {
  return {
    type: actionTypes.DELETE_USER,
    userId: userId
  }
}

// For Getting Roles Like Admin, Super Admin
export function getRole(){
  return async dispatch => {
    let a = await dispatch(setIsLoading(true))
    axios({
      url: API.GetRoleAPI,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response)=> {
      dispatch(setRole(response.data.role))
      // setRole(response.data.role)
      dispatch(setIsLoading(false))
    })
    
}
}

export function setRole(role) {
  return {
    type: actionTypes.SET_ROLES,
    role: role
  }
}
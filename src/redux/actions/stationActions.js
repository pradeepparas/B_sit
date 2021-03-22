import * as actionTypes from './actionTypes';
import * as API from '../../constants/APIs';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { mapProps } from 'recompose';

const station_id = localStorage.getItem('station_id');

export function setIsSubmitted(success) {
  return {
    type: actionTypes.IS_SUBMITTED,
    isSubmitted: success
  }
}

export function downloadStationDetails(stationId) {
  return async dispatch => {

    let a = await dispatch(setIsLoading(true))
    let url = `${API.GetStationAPI}/download/${stationId}`

    axios({
      url: url,
      // method: "PUT",
      // data: data,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      responseType: 'blob'
    }).then(response => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'file.xlsx');
       document.body.appendChild(link);
       link.click();
    }).then(blob => {
      dispatch(setIsLoading(false))
    }).catch(err => {
      toast.error(err.response.data.message)
      dispatch(setIsLoading(false))
    })
  }
}

// export function stationError(message) {
//   return {
//     type: actionTypes.STATION_ERROR,
//     message: message
//   }
// }

export function EditStationDetails(details) {
  return async dispatch => {
    let data = {
      "_id": details._id,
      "station_name": details.station_name,
      "station_code": details.station_code,
      "station_type": details.station_type,
      "managed_by": details.managed_by,
      "contract_giver": details.contract_giver,
      "contract_winner": details.contract_winner,
      "no_of_platform": details.no_of_platform,
      "station__gps_ltd": details.station__gps_lng,
      "station__gps_lng": details.station__gps_lng,
      "contract_start_date": moment(details.contract_start_date),
      "exp_end_date": moment(details.exp_end_date),
      "contract_tenure": details.contract_tenure,
      "contact_name": details.contact_name,
      "contact_mobile": details.contact_mobile,
      // "contact_email": details.contact_email,
      "is_assign_as_admin": details.is_assign_as_admin,
      "name": details.name,
      "mobile": details.mobile,
      // "email": details.email,
      "station_admin_id": details.station_admin_id
    }

    if(details.email)data.email = details.email;
    if(details.contact_email)data.contact_email = details.contact_email;
    let a = await dispatch(setIsLoading(true))
    axios({
      url: API.AddStationAPI,
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
  // "message": "Station updated succesfully",
  // "success": true,
  // "status": 200
    dispatch(setIsLoading(false))
    }).catch(err => {
        toast.error(err.response.data.message)
        dispatch(setIsSubmitted(false))
        dispatch(setIsLoading(false))
      })
  }
}

export function stationActions(details) {
  details.password = details.adminPassword
  let key = "adminPassword"

  // change date format using Moment
  details.contract_start_date = moment(details.contract_start_date).format("YYYY-MM-DD")
  details.exp_end_date = moment(details.exp_end_date).format("YYYY-MM-DD")

  if(details.contact_email == ''){
    delete details["contact_email"];
  }
  if(details.email == ''){
    delete details["email"];
  }
  console.log(details)
  debugger

  delete details[key];
  console.log('details action', details)
  return async dispatch => {
    let a = await dispatch(setIsLoading(true))
    debugger
    const data = details
    axios({
      method: 'post',
      url: API.AddStationAPI,
      headers: {
      //  'Accept-Language': 'hi',
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : JSON.stringify(details)
    }).then(response => {
      if(response.data.success){
        // toast.success(response.data.message)
        dispatch(setIsSubmitted(true))
        console.log(response)
      } else {
        debugger
      }
      dispatch(setIsLoading(false))
    }).catch((response) => {
      debugger
      // console.log(response.data)
      console.log(response.response.data.message)
      debugger
      toast.error(response.response.data.message)
      console.log(response.response.data.message)
      dispatch(setIsSubmitted(false))
      dispatch(setIsLoading(false))
    })
  }
}

export function fetchContractors(data) {
  return {
    type: actionTypes.FETCH_CONTRACTORS,
    data: data
  }
}

export function setStationDate(data) {
  return {
    type: actionTypes.EDIT_STATION,
    data: data
  }
}

export function setIsEditFalse(value) {
  return {
    type: actionTypes.SET_ISADD,
    value: value
  }
}

export function deleteStation(id) {
  return {
    type: actionTypes.DELETE_STATION,
    deleteId: id
  }
}

export function GetContractors() {
  return async dispatch => {
    let a = await dispatch(setIsLoading(true))
    axios({
      url: API.GetContractorsAPI,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      if(response.data.success){
        dispatch(fetchContractors(response.data.contractors))
      } else {

      }
      dispatch(setIsLoading(false))
    }).catch(err => {
      toast.error(err.response.data.message)
      // dispatch(setIsSubmitted(false))
      dispatch(setIsLoading(false))
    })
  }
}

// GET Stations Details by Parameters
export function getStationDataByParams(page, limit, values) {
  debugger
  return async(dispatch) => {
    let a = await dispatch(setIsLoading(true))

    let url = values ? `${API.GetStationAPI}/${page}/${limit}?search=${values.name}&station_name=${values.station_name}&station_type=${values.station_type}&managed_by=${values.managed_by}&start_date=${values.start_date}&end_date=${values.end_date}`: `${API.GetStationAPI}/${page}/${limit}`

    console.log(url)
    debugger
    // return
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
        // "total": 2,
        // "limit": 10,
        dispatch(fetchStationDataByParams(response.data.station.docs, response.data.station.total, response.data.station.limit))
      } else {
        dispatch(fetchStationDataByParams(response.data.station.docs ))
      }

    }).catch(err => {
      // toast.error(err.response.data.message)
      if(err.response.data.message == 'No Record Found'){
        dispatch(fetchStationDataByParams([]))
      }
      // dispatch(setIsSubmitted(false))
      dispatch(setIsLoading(false))
    }).then(() => dispatch(setIsLoading(false)))
  }
}

//  GET Stations Details for Dropdown
export function getStationData() {
  return async dispatch => {
    let a = await dispatch(setIsLoading(true))
    axios({
      url: API.GetStationAPI,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      if(response.data.success){
        dispatch(fetchStationData(response.data.station, response.data.station_type))
      } else {

      }
      dispatch(setIsLoading(false))
    }).catch(err => {
      toast.error(err.response.data.message)
      dispatch(setIsLoading(false))
      // dispatch(setIsSubmitted(false))
    }).then(() => dispatch(setIsLoading(false)))
  }
}

export function fetchStationData(stationData, stationType) {
  return {
    type: actionTypes.FETCH_STATIONS,
    stationData: stationData,
    stationType: stationType
  }
}

export function fetchStationDataByParams(docs, total, limit) {
  return {
    type: actionTypes.FETCH_STATION_BYPARAMS,
    docs: docs,
    total: total,
    limit: limit
  }
}

export function DeleteStationByID (stationId) {
  return dispatch => {

  }
}

export function setIsLoading(loading) {
  return {
    type: actionTypes.SET_ISLOADING,
    isLoading: loading
  }
  // let link = `${API.DashBoardAPI}?type=${type1}`;
  // debugger
  // let a = await dispatch(setIsLoading(true))
  // axios({
  //   method: 'GET',
  //   url: link,
  //   headers: {
  //     // "accept": "application/json",
  //     // "Content-Type": "application/json",
  //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //   }
  // }).then(response => JSON.stringify(response.data)).then(data => {
  //   console.log(data)
  //   debugger
  //   // if(response.data.success){
  //     // dispatch(setDashboardCount(response.data.counts))
  //   // }
  //   dispatch(setIsLoading(false))
  // }).catch(err => {
  //   debugger
  //   toast.error(err.message)
  //   dispatch(setIsLoading(false))
  // })
}

export function getDashboardCount(type1) {
  return async dispatch => {
    let link = `${API.DashBoardAPI}?type=${type1}&station_id=${station_id}`;
    debugger
    let a = await dispatch(setIsLoading(true))
    axios({
      method: 'GET',
      url: link,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      debugger
      if(response.data.success){
        dispatch(setDashboardCount(response.data.counts))
      }
      dispatch(setIsLoading(false))
    }).catch(err => {
      debugger
      toast.error(err.message)
      dispatch(setIsLoading(false))
    })
  }
}

export function setDashboardCount(counts) {
  return {
    type: actionTypes.SET_DASHBOARD_COUNT,
    counts: counts
  }
}

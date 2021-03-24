import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import * as API from '../../constants/APIs';
import { setIsLoading, setIsSubmitted } from './stationActions';
import { toast } from 'react-toastify';

export function getVendorDataByParams(page, limit, value) {
    return async dispatch => {
        let a = dispatch(setIsLoading(true))

        // ?provided_by=vendor&search=&category_id=&vendor_id=602babe2ce83d7315c9d3be3&station_id=&start_date=&end_date= name: "",
        let api = value ? `${API.GetVendorAPI}/${page}/${limit}?provided_by=vendor&search=${value.name}&category_id=${value.service_name}&vendor_id=${value.vendor_id}&station_id=${value.station_id}&start_date=${value.start_date}&end_date=${value.end_date}` : `${API.GetVendorAPI}/${page}/${limit}?provided_by=vendor`
        axios({
            url: api,
            headers: {
                "accept": "application/json",
                // "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },
        }).then(response => {
            debugger
            if(response.data.success){
              debugger
              dispatch(fetchVendorDataByParams(response.data.service.docs, response.data.service.totalDocs, response.data.service.limit))
            } else {
              dispatch(fetchVendorDataByParams(response.data.service.docs))
            }
            dispatch(setIsLoading(false))
          }).catch(err => {
            if(err.response.data.message === 'No Records Found'){
              dispatch(fetchVendorDataByParams([]))
            }
            // dispatch(setIsSubmitted(false))
            dispatch(setIsLoading(false))
          })
    }
}

export function getVendorDetails(stationId) {
  return async dispatch => {
    let api = `http://13.235.102.214:8000/vendors/byStation/${stationId}`
    let a = await dispatch(setIsLoading(true))
    axios({
      url: api,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      if(response.data.success){
        console.log(response.data)
        debugger
        dispatch(fetchVendorData(response.data.vendor, response.data.category))
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

export function fetchVendorData(vendorData, categoryData) {
  return {
    type: actionTypes.FETCH_VENDORS,
    vendorData: vendorData,
    categoryData: categoryData
  }
}

export function fetchVendorDataByParams(docs, total, limit){
    return {
        type: actionTypes.FETCH_VENDOR_BYPARAMS,
        docs: docs,
        total: total,
        limit: limit
      }
}

// Creating Vendors Details
export function manageVendorService(vendor, is_edit) {
    return async dispatch => {

        let station_id = localStorage.getItem('station_id');

        let data = {
          "name": vendor.vendor_name,
          "mobile": vendor.mobile_number,
          "email": vendor.email_address,
          "station_id": station_id,
          "warehouse_address": vendor.warehouse_address,
          "holder_name": vendor.account_holder_name,
          "account_number": vendor.account_number,
          "ifsc_code": vendor.ifsc_code,
          "bank_name": vendor.bank_name,
          "branch_address": vendor.branch_address,
          "max_commission": vendor.maximum_commission,
          "mini_commission": vendor.minimum_commission,
          "percentage_commission": vendor.commission_in_percentage,
          "status": vendor.status,
          "role": "602a45f701252b2aa4fcd80b"
        }

        console.log(data)
        debugger


        let a = await dispatch(setIsLoading(true));
        let url = is_edit ? `${API.VendorAPI}/${vendor._id}?station_id=${station_id}`:
                  `${API.VendorAPI}?station_id=${station_id}`

        let method = is_edit? "PUT": "POST";

        axios({
            url: url,
            method: method,
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            data: data
        }).then(response => {
          debugger
            if(response.data.success){
              debugger
                dispatch(setIsSubmitted(true))
                // toast.success(response.data.message)
                dispatch(setIsLoading(false));
            } else {
              debugger
                toast.error(response.data.message)
            }
        }).catch(err => {
          debugger
            toast.error(err.response.data.message)
            dispatch(setIsLoading(false));
        })
    }
}

// Getting Vendor Management for details
export function getVendorManagementByParams(page, limit, params) {
    return async dispatch => {
        let a = await dispatch(setIsLoading(true));

        let station_id = localStorage.getItem('station_id');
        let url = `${API.VendorAPI}/${page}/${limit}?station_id=${station_id}&search=${params.name}&vendor_id=${params.vendor_name}&start_date=${params.start_date}&end_date=${params.end_date}`;
        debugger
        axios({
            url: url,
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            debugger
            if(response.data.success){
                dispatch(setIsLoading(false));
                console.log(response.data)
                debugger
                dispatch(fetchVendorManagementByParams(response.data.vendor.docs, response.data.vendor.total, response.data.vendor.limit))
            }
            debugger
        }).catch(err => {
            // toast.error(err.response.data.message)
            if(err.response.data.message === "No Record Found"){
              dispatch(fetchVendorManagementByParams([]))
            }
            debugger
            dispatch(setIsLoading(false));
        })
    }
}

// fetching SFMIS Services details
export function fetchVendorManagementByParams(docs, total, limit) {
    return {
        docs: docs,
        total: total,
        limit: limit,
        type: actionTypes.FETCH_VENDOR_MANAGEMENT_BYPARAMS
    }
}

// Get Vendor data for drop down
export function getVendorManagement(){
  return async dispatch => {

    let station_id = localStorage.getItem('station_id');
    let a = await dispatch(setIsLoading(true))
    axios({
      url: `${API.VendorAPI}?station_id=${station_id}`,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then(response => {
      console.log(response)
      if(response.data.success){
        dispatch(fetchVendorManagement(response.data.vendor))
      } else {

      }
      dispatch(setIsLoading(false))
    }).catch(err => {
      dispatch(fetchVendorManagement([]))
      // toast.error(err.response.data.message)
      // dispatch(setIsSubmitted(false))
      dispatch(setIsLoading(false))
    })
  }
}

// Fetch Vendor data for drop down
export function fetchVendorManagement(data) {
  return {
    type: actionTypes.FETCH_VENDOR_MANAGEMENT,
    data: data
  }
}

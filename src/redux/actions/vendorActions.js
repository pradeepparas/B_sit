import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import * as API from '../../constants/APIs';
import { setIsLoading } from './stationActions';
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
            if(err.response.data.message == 'No Records Found'){
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

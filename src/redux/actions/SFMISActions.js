import * as actionTypes from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from '../../constants/APIs';
import { setIsLoading } from './stationActions';

// Creating and Updating the Category Services Details
export function manageCategoryServices(category, is_edit) {
    return async dispatch => {
        // let station_id = localStorage.getItem('userId')
        let a = await dispatch(setIsLoading(true));
        console.log(is_edit)
        debugger

        let data = {
            "category_name": category.category_name,
            // "category_icon": category.category_icon,
            "service_type": category.service_type,
            "file_name": category.file_name,
            "status": category.status,
            "station_id": localStorage.getItem('station_id')
          }

        if(category.category_icon){
            data.category_icon = category.category_icon;
        }
        debugger

        var detail = JSON.stringify(data);
        let url = is_edit ? `${API.AddServiceCategories}/${category._id}` : API.AddServiceCategories
        let method = is_edit ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: detail
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            debugger
            if(data.success) {
                toast.success(data.message);
                dispatch(setIsLoading(false));
                dispatch(getCategoryServicesByParams(1, 10));
            } else {
                toast.error(data.message)
                dispatch(setIsLoading(false));
            }
        }).catch(err => {
            toast.error(err.message);
            dispatch(setIsLoading(false));
        })
          
    }
}

// Getting Category Services Details from Server.
export function getCategoryServicesByParams(page, limit) {
    return async dispatch => {
        let a = await dispatch(setIsLoading(true));

        let station_id = localStorage.getItem('station_id');
        let url = `${API.AddServiceCategories}/${page}/${limit}?station_id=${station_id}`;
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
                dispatch(fetchCategoryServicesByParams(response.data.category.docs, response.data.category.total, response.data.category.limit))
            }
            debugger
        }).catch(err => {
            console.log(err)
            dispatch(setIsLoading(false));
        })
    }
}

// Getting Category Services details for Drop Down
export function getCategoryServices() {
    return async dispatch => {
        let station_id = localStorage.getItem('station_id');
        let a = await dispatch(setIsLoading(true));

        axios({
            url: `${API.AddServiceCategories}?station_id=${station_id}`,
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(response => {
            console.log(response)
            debugger
            if(response.data.success){
                dispatch(fetchCategoryServices(response.data.category))
                dispatch(setIsLoading(false));
            }
            debugger
        }).catch(err => {
            toast.error(err.response.data.message)
            dispatch(setIsLoading(false));
        })
    }
}

// fetching Category Services details
export function fetchCategoryServicesByParams(docs, total, limit) {
    return {
        docs: docs,
        total: total,
        limit: limit,
        type: actionTypes.FETCH_CATEGORY_SERVICES_BYPARAMS
    }
}

// fetching Category Services details for Drop Down
export function fetchCategoryServices(serviceCategory) {
    return {
        type: actionTypes.FETCH_CATEGORY_SERVICES,
        serviceCategory: serviceCategory
    }
}

// Creating SFMIS services Details
export function manageSFMISServices(SFMIS) {
    return async dispatch => {

        let station_id = localStorage.getItem('station_id');

        let data = {
            "station_id": station_id,
            "provided_by": "STATION",
            "display_name": SFMIS.display_name,
            // "service_type": 602fa0734c7ed637d03eb735,
            "is_chargeable": SFMIS.chargeable,
            "service_booking_mobile": SFMIS.mobile_number,
            "service_icon": SFMIS.fileName,
            "from_time": SFMIS.from_time_value,
            "end_time": SFMIS.to_time_value,
            "preparation_duration": SFMIS.preparation_duration,
            "max_use_duration": SFMIS.maximum_duration,
            "service_cancel": SFMIS.is_cancellation,
            "service_happy_code": SFMIS.is_happy_code,
            "status": SFMIS.is_active,
            "service_category": SFMIS.service_category,
            "file_name": SFMIS.fileNameExt
          }

        console.log(data)
        debugger
        
        
        let a = await dispatch(setIsLoading(true));

        axios({
            url: `${API.SFMISAPI}?station_id=${station_id}&provided_by=STATION`,
            method: 'POST', 
            headers: {
                "accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            data: data
        }).then(response => {
            if(response.data.success){
                toast.success(response.data.message)
                dispatch(setIsLoading(false));
            } else {
                toast.error(response.data.message)
            }
        }).catch(err => {
            toast.error(err.response.data.message)
            dispatch(setIsLoading(false));
        })
    }
}
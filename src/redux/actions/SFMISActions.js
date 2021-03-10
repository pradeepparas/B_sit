import * as actionTypes from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from '../../constants/APIs';
import { setIsLoading } from './stationActions';

export function manageCategoryServices(category, is_edit) {
    return async dispatch => {
        // let station_id = localStorage.getItem('userId')
        let a = await dispatch(setIsLoading(true));
        console.log(is_edit)
        debugger

        let data = {
            "category_name": category.category_name,
            "category_icon": category.category_icon,
            "service_type": category.service_type,
            "file_name": category.file_name,
            "status": category.status,
            "station_id": localStorage.getItem('station_id')
          }

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
                dispatch(getCategoryServices(1, 10))
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

export function getCategoryServices(page, limit) {
    return dispatch => {

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
                dispatch(fetchCategoryServices(response.data.category.docs, response.data.category.total, response.data.category.limit))
            }
            debugger
        }).catch(err => {
            console.log(err)
        })
    }
}

export function fetchCategoryServices(docs, total, limit) {
    return {
        docs: docs,
        total: total,
        limit: limit,
        type: actionTypes.FETCH_CATEGORY_SERVICES
    }
}
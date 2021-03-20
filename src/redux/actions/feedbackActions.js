import axios from "axios";
import { toast } from "react-toastify";
import * as actionTypes from "./actionTypes";
import * as API from "../../constants/APIs";
import { setIsLoading } from "./stationActions";

const station_id = localStorage.getItem('station_id');

export function getFeedbackDataByParams(page, limit, params) {
    return async dispatch => {
        let a = await dispatch(setIsLoading(true))

    axios({
        url: `${API.FeedBackAPI}/${page}/${limit}?receiver_id=${station_id}`,
        headers: {
            'accept': 'Application/json',
            // "Content/type": "Application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    }).then(response => {
        debugger
        if(response.data.success){
            dispatch(setIsLoading(false))
            // toast.success(response.data.message)
            dispatch(fetchFeedbackDataByParams(response.data.feedback.docs, response.data.feedback.totalDocs, response.data.feedback.limit))
        }
    }).catch(err => {
        debugger
        dispatch(setIsLoading(false))
        toast.error(err.response.data.message)
    })
    }
    
}

export function fetchFeedbackDataByParams(docs, total, limit){
    return {
        type: actionTypes.FETCH_FEEDBACK_BYPARAMS,
        total: total,
        limit: limit,
        docs: docs
    }
}
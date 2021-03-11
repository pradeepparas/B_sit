import * as actionTypes from '../actions/actionTypes';

const initialState = {
    docs: [],
    serviceCategory: []
}

const SFMISReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORY_SERVICES_BYPARAMS:
            return {
                ...state,
                docs: action.docs
            }
        
        case actionTypes.FETCH_CATEGORY_SERVICES:
            return {
                ...state,
                serviceCategory: action.serviceCategory
            }

        default:
            return state;
    }
}

export default SFMISReducer;
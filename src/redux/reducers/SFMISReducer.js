import * as actionTypes from '../actions/actionTypes';

const initialState = {
    docs: [],
}

const SFMISReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORY_SERVICES:
            return {
                ...state,
                docs: action.docs
            }

        default:
            return state;
    }
}

export default SFMISReducer;
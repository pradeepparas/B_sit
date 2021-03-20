import * as actionTypes from '../actions/actionTypes';

const initialState = {
    docs: [],
    total: "",
    limit: ""
}

const feedbackReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_FEEDBACK_BYPARAMS:
            return {
                ...state,
                docs: action.docs,
                total: action.total,
                limit: action.limit
            }
        default: 
            return state;
    }
}

export default feedbackReducer;
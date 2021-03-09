import * as actionTypes from '../actions/actionTypes';

const initialState = {
  docs: [],
  vendorsList: [],
  total: '',
  limit: '',
  vendorDetails: [],
  categoryData: []
};

const vendorReducer = (state = initialState, action) => {
    switch(action.type){
        // case actionTypes.FETCH_VENDORS:
        //     return {
        //         ...state,
        //         vendorsList: action.vendors
        //     }

        case actionTypes.FETCH_VENDOR_BYPARAMS:
            return {
                ...state,
                docs: action.docs,
                total: action.total,
                limit: action.limit
            }

        case actionTypes.FETCH_VENDORS:
            return {
              ...state,
              categoryData: action.categoryData,
              vendorDetails: action.vendorData,
            }
        default:
            return state;
    }
}

export default vendorReducer;

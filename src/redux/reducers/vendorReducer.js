import * as actionTypes from '../actions/actionTypes';

const initialState = {
  docs: [],
  vendorsList: [],
  total: '',
  limit: '',
  vendorDetails: [],
  categoryData: [],
  vendorDocs: [],
  vendorTotal: "",
  vendorLimit: "",
  vendorData: []
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

        case actionTypes.FETCH_VENDOR_MANAGEMENT_BYPARAMS:
            return {
              ...state,
              vendorDocs: action.docs,
              vendorTotal: action.total,
              vendorLimit: action.limit
            }

        case actionTypes.FETCH_VENDOR_MANAGEMENT:
              return {
                ...state,
                vendorData: action.data
              }
        default:
            return state;
    }
}

export default vendorReducer;

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    docs: [],
    serviceCategory: [],
    sfmisDocs: [],
    sfmisLimit: '',
    sfmisTotal: '',
    total: '',
    limit: '',
    itemsDocs: [],
    itemsLimit: "",
    itemsTotal: ""
}

const SFMISReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORY_SERVICES_BYPARAMS:
            return {
                ...state,
                docs: action.docs,
                total: action.total,
                limit: action.limit
            }

        case actionTypes.FETCH_CATEGORY_SERVICES:
            return {
                ...state,
                serviceCategory: action.serviceCategory
            }

        case actionTypes.FETCH_SFMIS_SERVICES_BYPARAMS:
            return {
              ...state,
              sfmisDocs: action.docs,
              sfmisTotal: action.total,
              sfmisLimit: action.limit
            }

        case actionTypes.FETCH_ITEMS_BYPARAMS:
            return {
              ...state,
              itemsDocs: action.docs,
              itemsTotal: action.total,
              itemsLimit: action.limit
            }
        default:
            return state;
    }
}

export default SFMISReducer;

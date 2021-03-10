import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  stationDetails: [],
  details: [],
  stationData: {},
  isEdit: false,
  contractorsList: [],
  isSubmitted: false,
  docs: [],
  total: '',
  limit: '',
  stationType: [],
  dashboardCount: {}
};

const stationReducer = (state = initialState, action) => {
  // debugger
  switch (action.type) {
    // Add stations
    case actionTypes.ADD_STATION:
      var value = action.details;
      return {
        ...state,
        details: state.details.concat(value)
      }
    
    // Edit Station details
    case actionTypes.EDIT_STATION:
      return {
        ...state,
        isEdit: true,
        stationData: action.data
      }
    
    // Set station details are added or updated 
    case actionTypes.SET_ISADD:
      return {
        ...state,
        isEdit: action.value
      }
    
    // delete Station details or this Delete Station case is Empty
    case actionTypes.DELETE_STATION:
      let stations = state.details.filter((item, index) => index !== action.deleteId)
      return {
        ...state,
        details: stations
      }
    
    // Get Contractors details
    case actionTypes.FETCH_CONTRACTORS:
      return {
        ...state,
        contractorsList: action.data
      }
    
    // Station Error or use can comment this Case
    case actionTypes.STATION_ERROR:
      return {
        ...state,
        error: true
      }

    case actionTypes.IS_SUBMITTED:
      return {
        ...state,
        isSubmitted: action.isSubmitted
      }

    case actionTypes.FETCH_STATIONS:
      return {
        ...state,
        stationType: action.stationType,
        stationDetails: action.stationData
      }

    case actionTypes.FETCH_STATION_BYPARAMS:
      return {
        ...state,
        docs: action.docs,
        total: action.total,
        limit: action.limit
      }

    // Dashboard count
    case actionTypes.SET_DASHBOARD_COUNT: {
      return {
        ...state,
        dashboardCount: action.counts
      }
    }
      case actionTypes.SET_ISLOADING:
        return {
          ...state,
          isLoading: action.isLoading
        }

    default:
      return state;
  }
};

export default stationReducer;

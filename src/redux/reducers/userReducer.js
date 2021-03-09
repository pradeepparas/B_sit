import * as actionTypes from '../actions/actionTypes';

const initialState = {
  usersList: [],
  isEdit:false,
  userData:{},
  docs: [],
  total: '',
  limit: '',
  role: []
};
// FETCH_USER_BYPARAMS
const userReducer = (state = initialState, action) => {
  // debugger
  
  switch (action.type) {
    case actionTypes.ADD_USER:
      var value = action.user;
      return {
        ...state,
        // usersList: state.usersList.concat(value)
      }
      case actionTypes.EDIT_USER:
        var value = action.data;
        return {
          ...state,
          userData: value,
          isEdit:true
        }

      case actionTypes.SET_ISADD:
        return {
          ...state,
          isEdit: action.value
        }

      case actionTypes.DELETE_USER:
        let users = state.usersList.filter((item, index) => index !== action.userId)
        return {
          ...state,
          usersList: users
        }
      
      case actionTypes.FETCH_USER_BYPARAMS:
        return {
          ...state,
          docs: action.docs,
          total: action.total,
          limit: action.limit
        }

      case actionTypes.SET_ROLES:
        return {
          ...state,
          role: action.role
        }
        
    default:
      return state;
  }
};

export default userReducer;

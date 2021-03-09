import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tokenId: null,
    authData: null,
    error: null,
    loginMessage: ""
}

const auth = (state = initialState, action) => {
    // debugger
    switch (action.type) {
      case actionTypes.AUTH_SUCCESS: 
        return {
            tokenId: action.idToken,
            authData: action.authData,
            error: null,
            loginMessage: action.message
        }

      case actionTypes.AUTH_FAIL:
        return {
            error: action.error,
            loginMessage: action.message
        }
        
      case actionTypes.AUTH_LOGOUT:
          return {
            tokenId: null,
            authData: null,
            error: null,
            loginMessage: ""
          }
      default:
        return state;
    }
  };
  
  export default auth;
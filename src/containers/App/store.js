import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
// import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {
  themeReducer,
  rtlReducer,
  cryptoTableReducer,
  customizerReducer,
  newOrderTableReducer,
  sidebarReducer,
  authReducer,
  stationReducer,
  userReducer,
  vendorReducer,
  auth,
  SFMISReducer,
  feedbackReducer
} from '../../redux/reducers/index';
import appConfigReducer from '../../redux/reducers/appConfigReducer';
import covidReducer from '../Maps/VectorMapWithRequestData/redux/covidReducer';
import todoReducer from '../Todo/redux/reducer';

const checkTokenExpirationMiddleware = store => next => action => {
  // const history = useHistory()
  let token1 = localStorage.getItem('token')
  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6I
        kpXVCJ9.eyJ1c2VybmFtZSI6Ijk5Nzc0MjgwODAiLCJ
        faWQiOiI2MDI2MjkyZWU3YjM5ZDJhYzQ2Y2Q3NDAiLCJwYXNzd2
        9yZCI6IiQyYiQxMCRTUkVEZndaaEt6cVQ4ZmNiQ3lUL2ZPY
        y9FNXhIaWdhaXpvNHhMbXNHeUhaNkNrb3BmN0doLiIsInJvbGUiOiJ
        zdXBlcl9hZG1pbiIsInJvbGVJZCI6IjYwMjYyNmY2M2Q0OW
        FhMjI0ODM1ZWZmMiIsImlhdCI6MTYxMzU2NTYyOSwiZXhwIj
        oxNjEzNjUyMDI5fQ.JISopYJmsJdyT98yqDKJKuvUpvwxrdkcQLhGGSIkmDI`;

  if(token1){
    if (jwt_decode(token1).exp < Date.now() / 1000) {
      next(action);
      localStorage.clear();
      // history.push('/');
    }
  }
  next(action);
};

const reducer = combineReducers({
  Vendors: vendorReducer,
  Users: userReducer,
  Auth: auth,
  Stations: stationReducer,
  SFMIS: SFMISReducer,
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  rtl: rtlReducer,
  appConfig: appConfigReducer,
  cryptoTable: cryptoTableReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
  sidebar: sidebarReducer,
  user: authReducer,
  covid: covidReducer,
  todo: todoReducer,
  Feedback: feedbackReducer
});
const store = createStore(reducer, applyMiddleware(thunk, checkTokenExpirationMiddleware));

export default store;

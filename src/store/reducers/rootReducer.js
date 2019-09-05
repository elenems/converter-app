import {combineReducers} from 'redux';
import currencyReducer from '../reducers/currencyReducer';
import uiReducer from '../reducers/uiReducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
  ui: uiReducer
})

export default rootReducer;
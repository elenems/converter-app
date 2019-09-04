import {combineReducers} from 'redux';
import currencyReducer from '../reducers/currencyReducer';

const rootReducer = combineReducers({
  currency: currencyReducer
})

export default rootReducer;
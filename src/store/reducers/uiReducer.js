import { SET_ERROR, REMOVE_ERROR, SET_LOADING, REMOVE_LOADING } from "../actions/actionTypes";

const initState = {
  error: "",
  isLoading:false
};

const uiReducer = (state = initState, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading:true
    };
  }

  if (action.type === REMOVE_LOADING) {
    return {
      ...state,
      isLoading:false
    };
  }

  if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload
    };
  }

  if (action.type === REMOVE_ERROR) {
    return {
      ...state,
      error: ""
    };
  }
  return state;
};

export default uiReducer;

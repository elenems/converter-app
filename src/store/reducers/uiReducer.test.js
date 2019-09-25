import reducer from "./uiReducer";
import * as types from "../actions/actionTypes";

describe("ui reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      error: "",
      isLoading: false
    });
  });

  it("should handle SET_LOADING", () => {
    const initState = {
      error: "",
      isLoading: false
    };
    expect(
      reducer(initState, {
        type: types.SET_LOADING
      })
    ).toEqual({
      error: "",
      isLoading: true
    });
  });

  it("should handle REMOVE_LOADING", () => {
    const initState = {
      error: "",
      isLoading: true
    };
    expect(
      reducer(initState, {
        type: types.REMOVE_LOADING
      })
    ).toEqual({
      error: "",
      isLoading: false
    });
  });

  it("should handle REMOVE_ERROR", () => {
    const initState = {
      error: "Error",
      isLoading: false
    };
    expect(
      reducer(initState, {
        type: types.REMOVE_ERROR
      })
    ).toEqual({
      error: "",
      isLoading: false
    });
  });

  it("should handle SET_ERROR", () => {
    const initState = {
      error: "",
      isLoading: false
    };
    expect(
      reducer(initState, {
        type: types.SET_ERROR,
        payload: 'Error'
      })
    ).toEqual({
      error: "Error",
      isLoading: false
    });
  });

});

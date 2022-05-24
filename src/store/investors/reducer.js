import {
  GET_INVESTORS,
  GET_INVESTORS_SUCCESS,
  GET_INVESTORS_FAIL,
  GET_INVESTOR_DETAIL,
  GET_INVESTOR_DETAIL_SUCCESS,
  GET_INVESTOR_DETAIL_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  investors: [],
  investorDetail: {},
  error: null,
}

const projects = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVESTORS_SUCCESS:
      return {
        ...state,
        investors: action.payload,
      }
    case GET_INVESTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_INVESTOR_DETAIL_SUCCESS:
      return {
        ...state,
        investorDetail: action.payload,
      }

    case GET_INVESTOR_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default projects

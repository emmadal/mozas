import {
  GET_INVESTORS,
  GET_INVESTORS_SUCCESS,
  GET_INVESTORS_FAIL,
  GET_INVESTOR_DETAIL,
  GET_INVESTOR_DETAIL_SUCCESS,
  GET_INVESTOR_DETAIL_FAIL,
} from "./actionTypes"

export const getInvestors = () => ({
  type: GET_INVESTORS,
})

export const getInvestorsSuccess = investors => ({
  type: GET_INVESTORS_SUCCESS,
  payload: investors,
})

export const getInvestorsFail = error => ({
  type: GET_INVESTORS_FAIL,
  payload: error,
})

export const getInvestorDetail = investorId => ({
  type: GET_INVESTOR_DETAIL,
  investorId,
})

export const getInvestorDetailSuccess = investorDetails => ({
  type: GET_INVESTOR_DETAIL_SUCCESS,
  payload: investorDetails,
})

export const getInvestorDetailFail = error => ({
  type: GET_INVESTOR_DETAIL_FAIL,
  payload: error,
})

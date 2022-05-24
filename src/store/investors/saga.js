import { call, put, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_INVESTORS,
  GET_INVESTOR_DETAIL,
  GET_INVESTORS_SUCCESS,
  GET_INVESTOR_DETAIL_SUCCESS,
} from "./actionTypes"

import {
  getInvestorsSuccess,
  getInvestorsFail,
  getInvestorDetailSuccess,
  getInvestorDetailFail,
} from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "helpers/firebase_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

function* fetchInvestors() {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.getAllInvestors)
      yield put(getInvestorsSuccess(response))
    }
  } catch (error) {
    yield put(getInvestorsFail(error))
  }
}

function* fetchInvestorDetail({ investorId }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.getInvestorsDetails, investorId)
      yield put(getInvestorDetailSuccess(response))
    } else {
      const response = yield call(getInvestorsDetails, investorId)
      yield put(getInvestorDetailSuccess(response))
    }
  } catch (error) {
    yield put(getInvestorDetailFail(error))
  }
}

function* projectsSaga() {
  yield takeLatest(GET_INVESTORS_SUCCESS, fetchInvestors)
  yield takeLatest(GET_INVESTOR_DETAIL, fetchInvestorDetail)
}

export default projectsSaga

import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Crypto Redux States
import { GET_PROJECTS, GET_PROJECT_DETAIL, DELETE_PROJECT, UPDATE_PROJECT, ADD_PROJECT_SUCCESS, GET_PROJECTS_SUCCESS, UPDATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from "./actionTypes"
import {
  getProjectsSuccess,
  getProjectsFail,
  getProjectDetailSuccess,
  getProjectDetailFail,
  addProjectFail,
  addProjectSuccess,
  updateProjectSuccess,
  updateProjectFail,
  deleteProjectSuccess,
  deleteProjectFail,
} from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "helpers/firebase_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

function* fetchProjects() {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.getAllProjects)
      yield put(getProjectsSuccess(response))
    }
  } catch (error) {
    yield put(getProjectsFail(error))
  }
}

function* fetchProjectDetail({ projectId }) {
  try {
    const response = yield call(getProjectsDetails, projectId)
    yield put(getProjectDetailSuccess(response))
  } catch (error) {
    yield put(getProjectDetailFail(error))
  }
}

function* onUpdateProject({ payload: project }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.updateProject, project)
      yield put(updateProjectSuccess(response))
    }
  } catch (error) {
    yield put(updateProjectFail(error))
  }
}

function* onDeleteProject({ payload: project }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.deleteProject, project)
      yield put(deleteProjectSuccess(response))
    } else {
      const response = yield call(deleteProject, project)
      yield put(deleteProjectSuccess(response))
    }
  } catch (error) {
    yield put(deleteProjectFail(error))
  }
}

function* onAddNewProject({ payload: project }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.addProject, project)
      yield put(addProjectSuccess(response))
    }
  } catch (error) {
    yield put(addProjectFail(error))
  }
}

function* projectsSaga() {
  yield takeLatest(GET_PROJECTS_SUCCESS, fetchProjects)
  yield takeLatest(GET_PROJECT_DETAIL, fetchProjectDetail)
  yield takeLatest(ADD_PROJECT_SUCCESS, onAddNewProject)
  yield takeLatest(UPDATE_PROJECT_SUCCESS, onUpdateProject)
  yield takeLatest(DELETE_PROJECT_SUCCESS, onDeleteProject)
}

export default projectsSaga

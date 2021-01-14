import axios from "axios";
import { all, put, fork, takeLatest } from "redux-saga/effects";
import { GET_REQUEST, GET_FAILURE, GET_SUCCESS, POLLING_REQUEST, POLLING_SUCCESS, POLLING_FAILURE } from "../reducer";


function loadAPI({ selectedKey, lastId }) {
  return axios.get(`/api/${selectedKey}?limit=10&lastId=${lastId}`);
}
function* getRequest(action) {
  try {
    const result = yield loadAPI(action);
    yield put({
      type: GET_SUCCESS,
      payload: result.data,
      selectedKey: action.selectedKey
    });
  } catch (e) {
    yield put({
      type: GET_FAILURE,
      error: e.response.data,
      selectedKey: action.selectedKey
    });
  }
}

function loadPollingAPI({ selectedKey, lastId }) {
  return axios.get(`/refresh?site=${selectedKey}&lastId=${lastId}`, { timeout: 80000 })
}
function* pollingRequest(action) {
  try {
    const result = yield loadPollingAPI(action);
    yield put({
      type: POLLING_SUCCESS,
      payload: result.data,
      selectedKey: action.selectedKey
    });
  } catch (e) {
    yield put({
      type: POLLING_FAILURE,
      error: e.response.data,
      selectedKey: action.selectedKey
    });
  }
}
function* watchTotalLoad() {
  yield takeLatest(GET_REQUEST, getRequest);
}

function* watchPollingLoad() {
  yield takeLatest(POLLING_REQUEST, pollingRequest);
}
export default function* () {
  yield all([
    fork(watchTotalLoad),
    fork(watchPollingLoad)
  ]);
}
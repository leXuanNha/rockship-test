import "regenerator-runtime/runtime";
import { put, call, takeEvery, all, takeLatest } from "redux-saga/effects";
import * as AuthActionType from "./constants";
import firebaseApp from "../config/firebase";

export function* registerAsync(action) {
  const { payload } = action;
}

export default function* WatchAuth() {
  yield all([takeLatest(AuthActionType.REGISTER_ASYNC, registerAsync)]);
}

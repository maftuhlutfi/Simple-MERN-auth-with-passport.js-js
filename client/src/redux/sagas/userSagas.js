import { all, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure
} from '../actions/userActions';

function signInApi(username, password) {
	return axios({
		method: "POST",
		data: {
			username,
			password
		},
		withCredentials: true,
		url: "http://localhost:4000/login",
		})
		.then(res => {
			return res.data
		})
		.catch(err => {
			throw "Password or username is incorrect.";
		});
}

function getCurrentUser() {
	return axios({
		method: "GET",
		withCredentials: true,
		url: "http://localhost:4000/user"
		})
		.then(res => {
			return res.data
		})
		.catch(err => {
			throw "not logged in";
		});
}

export function* signIn({payload: {username, password}}) {
	try {
		const user = yield call(signInApi, username, password);
		yield put(signInSuccess(user));
	} catch(err) {
		yield put(signInFailure(err));
	}
}

export function* isUserLoggedIn() {
	const user = yield call(getCurrentUser);
	if (user) {
		yield put(signInSuccess(user));
	} else {
		return;
	}
}

export function* onSignInStart() {
	yield takeLatest('SIGN_IN_START', signIn)
}

export function* onCheckUserSession() {
	yield takeLatest('CHECK_USER_SESSION', isUserLoggedIn)
}

export function* userSagas() {
	yield all([
		call(onSignInStart),
		call(onCheckUserSession)
	])
}
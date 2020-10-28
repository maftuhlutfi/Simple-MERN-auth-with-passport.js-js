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
		.then(res => res)
		.catch(err => {
			console.log(err);
			throw err;
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

export function* onSignInStart() {
	yield takeLatest('SIGN_IN_START', signIn)
}

export function* userSagas() {
	yield all([
		call(onSignInStart)
	])
}
import { all, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
	signInSuccess,
	signInFailure,
	signOutSuccess,
	signOutFailure,
	signUpSuccess,
	signUpFailure,
	changePasswordSuccess,
	changePasswordFailure
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
			throw new Error("Password or username is incorrect.");
		});
}

function signUpApi(username, password) {
	return axios({
		method: "POST",
		data: {
			username,
			password
		},
		withCredentials: true,
		url: "http://localhost:4000/register",
	})
		.then(res => {
			return res.data.user
		})
		.catch(err => {
			const { message } = err.response.data;
			throw new Error(message);
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
			throw new Error("Not logged in");
		});
}

function changePasswordApi(user, oldPassword, newPassword) {
	return axios({
			method: "POST",
			data: {
				user,
				oldPassword,
				newPassword
			},
			withCredentials: true,
			url: "http://localhost:4000/change-password",
		})
		.then(res => {
			return res.data
		})
		.catch(err => {
			throw new Error('Old password is wrong.');
		});
}

function signOutApi() {
	return 	axios({
				method: "GET",
				withCredentials: true,
				url: "http://localhost:4000/logout"
			})
			.then(res => {
				console.log(res);
				return res.data
			})
			.catch(err => {
				throw new Error("Cannot logged out.");
			});
}

export function* signIn({payload: {username, password}}) {
	try {
		const user = yield call(signInApi, username, password);
		yield put(signInSuccess(user));
	} catch(err) {
		yield put(signInFailure(err.message));
	}
}

export function* signUp({payload: {username, password}}) {
	try {
		const user = yield call(signUpApi, username, password);
		yield put(signUpSuccess(user));
	} catch(err) {
		yield put(signUpFailure(err.message));
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

export function* changePassword({payload: {user, oldPassword, newPassword}}) {
	try {
		const successMsg = yield call(changePasswordApi, user, oldPassword, newPassword);
		yield put(changePasswordSuccess(successMsg));
	} catch (err) {
		yield put(changePasswordFailure(err.message));
	}
}

export function* signOut() {
	try {
		const successMsg = yield call(signOutApi);
		console.log(successMsg);
		yield put(signOutSuccess(successMsg));
	} catch(err) {
		yield put(signOutFailure(err.message));
	}
}

export function* onSignInStart() {
	yield takeLatest('SIGN_IN_START', signIn)
}

export function* onSignUpStart() {
	yield takeLatest('SIGN_UP_START', signUp)
}

export function* onCheckUserSession() {
	yield takeLatest('CHECK_USER_SESSION', isUserLoggedIn)
}

export function* onChangePasswordStart() {
	yield takeLatest('CHANGE_PASSWORD_START', changePassword)
}

export function* onSignOutStart() {
	yield takeLatest('SIGN_OUT_START', signOut)
}
export function* userSagas() {
	yield all([
		call(onSignInStart),
		call(onSignUpStart),
		call(onCheckUserSession),
		call(onChangePasswordStart),
		call(onSignOutStart)
	])
}
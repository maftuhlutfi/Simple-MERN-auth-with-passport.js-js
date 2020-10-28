import {all, call} from 'redux-saga/effects';
import { userSagas } from './userSagas';

export default function* allSagas() {
	yield all([
		call(userSagas)
	])
}
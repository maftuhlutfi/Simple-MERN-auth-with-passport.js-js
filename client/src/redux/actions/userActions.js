export const signInStart = usernameAndPassword => ({
	type: 'SIGN_IN_START',
	payload: usernameAndPassword
})

export const signInSuccess = user => ({
	type: 'SIGN_IN_SUCCESS',
	payload: user
})

export const signInFailure = errMsg => ({
	type: 'SIGN_IN_FAILURE',
	payload: errMsg
})

export const signOutStart = () => ({
	type: 'SIGN_OUT_START'
})

export const signOutSuccess = successMessage => ({
	type: 'SIGN_OUT_SUCCESS',
	payload: successMessage
})

export const signOutFailure = errorMessage => ({
	type: 'SIGN_OUT_FAILURE',
	payload: errorMessage
})

export const signUpStart = userData => ({
	type: 'SIGN_UP_START',
	payload: userData
})

export const signUpSuccess = user => ({
	type: 'SIGN_UP_SUCCESS',
	payload: user
})

export const signUpFailure = errorMessage => ({
	type: 'SIGN_UP_FAILURE',
	payload: errorMessage
})

export const checkUserSession = () => ({
	type: 'CHECK_USER_SESSION'
})

export const changePasswordStart = userAndPasswords => ({
	type: 'CHANGE_PASSWORD_START',
	payload: userAndPasswords
})

export const changePasswordSuccess = successMessage => ({
	type: 'CHANGE_PASSWORD_SUCCESS',
	payload: successMessage
})

export const changePasswordFailure = errorMessage => ({
	type: 'CHANGE_PASSWORD_FAILURE',
	payload: errorMessage
})
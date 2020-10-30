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

export const signOutSuccess = () => ({
	type: 'SIGN_OUT_SUCCESS'
})

export const signOutFailure = errorMessage => ({
	type: 'SIGN_OUT_FAILURE',
	payload: errorMessage
})

export const checkUserSession = () => ({
	type: 'CHECK_USER_SESSION'
})
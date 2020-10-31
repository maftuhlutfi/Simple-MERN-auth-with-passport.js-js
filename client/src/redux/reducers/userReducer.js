const INITIAL_STATE = {
	currentUser: null,
	errMsg: null,
	isLoading: false
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SIGN_IN_START':
		case 'SIGN_UP_START':
			return ({
				...state,
				errMsg: null,
				isLoading: true
			});
		case 'SIGN_IN_SUCCESS':
		case 'SIGN_UP_SUCCESS':
			return ({
				...state,
				errMsg: null,
				isLoading: false,
				currentUser: action.payload
			});
		case 'SIGN_IN_FAILURE':
		case 'SIGN_UP_FAILURE':
			return ({
				...state,
				errMsg: action.payload,
				isLoading: false
			});
		default:
			return state;
	}
}

export default userReducer;
const INITIAL_STATE = {
	currentUser: null,
	errMsg: null,
	isLoading: false
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SIGN_IN_START':
			return ({
				...state,
				errMsg: null,
				isLoading: true
			});
		case 'SIGN_IN_SUCCESS':
			return ({
				...state,
				errMsg: null,
				isLoading: false,
				currentUser: action.payload
			});
		case 'SIGN_IN_FAILURE':
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
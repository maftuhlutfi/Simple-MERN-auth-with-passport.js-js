import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
	[selectUser],
	user => user.currentUser
)

export const selectIsLoading = createSelector(
	[selectUser],
	user => user.isLoading
)

export const selectErrMsg = createSelector(
	[selectUser],
	user => user.errMsg
)

export const selectSuccessMsg = createSelector(
	[selectUser],
	user => user.successMsg
)
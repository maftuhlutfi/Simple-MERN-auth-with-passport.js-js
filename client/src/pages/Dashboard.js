import {useEffect, useState} from 'react';
import './Dashboard.css';

import Input from '../components/Input';
import Button from '../components/ButtonWithSpinner';
import ErrMsg from '../components/ErrMsg';

import { useSelector, useDispatch } from 'react-redux';
import { changePasswordStart, signOutStart } from '../redux/actions/userActions';

import { selectCurrentUser, selectIsLoading, selectErrMsg } from '../redux/selectors/userSelector';

function Dashboard(props) {
	const dispatch = useDispatch();

	const currentUser = useSelector(state => selectCurrentUser(state));
	const { username } = currentUser;

	const isLoading = useSelector(state => selectIsLoading(state));
	let errMsgRes = useSelector(state => selectErrMsg(state))

	const [input, setInput] = useState({ oldPassword: '', newPassword: '' });
	const { oldPassword, newPassword } = input;
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		setErrMsg(errMsgRes)
	}, [errMsgRes])

	useEffect(() => {
		document.title = `Dashboard ${username}`;
	})

	const handleChange = e => {
		const { name, value } = e.target;
		setErrMsg('');

		setInput(prev => {
			return {
				...prev,
				[name]: value
			}
		})
	}

	const handleChangePassword = e => {
		if (!(oldPassword && newPassword)) {
			setErrMsg('Please fill all input form.')
		} else if (oldPassword === newPassword) {
			setErrMsg('The new password is still the same as old password.')
		} else {
			setErrMsg('');
			dispatch(changePasswordStart({ user: currentUser, oldPassword, newPassword }));
		}
	}

	const handleLogout = () => {
		dispatch(signOutStart());
	}

	return (
		<div className="dashboard">
			<h1>Hello {username}</h1>
			<div className='change-pass-form'>
				<Input type='password' name='oldPassword' placeholder='Old Password' value={oldPassword} onChange={handleChange} />
				<Input type='password' name='newPassword' placeholder='New Password' value={newPassword} onChange={handleChange} />
				{
					errMsg ? <ErrMsg text={errMsg} /> : ''
				}
				<Button handleClick={handleChangePassword} isLoading={isLoading} label='Change Password' />
				<Button handleClick={handleLogout} label='Logout' />
			</div>
		</div>
	);
}

export default Dashboard;
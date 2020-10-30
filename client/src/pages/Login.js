import React, {useState, useEffect} from 'react';
import './Login.css';
import Input from '../components/Input';
import Button from '../components/ButtonWithSpinner';
import ErrMsg from '../components/ErrMsg';

import { signInStart } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoading, selectErrMsg } from '../redux/selectors/userSelector';

function Login(props) {
	const dispatch = useDispatch();
	const isLoading = useSelector(state => selectIsLoading(state));
	let errMsg = useSelector(state => selectErrMsg(state))

	const [input, setInput] = useState({ username: '', password: '' });
	const { username, password } = input;

	useEffect(() => {
		document.title = 'Login';
	})

	const handleClick = e => {
		dispatch(signInStart(input));
	}

	const handleChange = e => {
		const { name, value } = e.target;
		errMsg = '';

		setInput(prev => {
			return {
				...prev,
				[name]: value
			}
		})
	}

	return (
		<div className="login-page">
			<h1>Login</h1>
			<Input type='text' name='username' placeholder='Username' value={username} onChange={handleChange} />
			<Input type='password' name='password' placeholder='Password' value={password} onChange={handleChange} />
			{
				errMsg ? <ErrMsg text={errMsg} /> : ''
			}
			<Button handleClick={handleClick} isLoading={isLoading} />
		</div>
	);
}

export default Login;
import React, {useState, useEffect} from 'react';
import './Login.css';
import Input from '../components/Input';
import Button from '../components/ButtonWithSpinner';
import ErrMsg from '../components/ErrMsg';

import { signInStart } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

function Login(props) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [input, setInput] = useState({ username: '', password: '' });
	const [errMsg, setErrMsg] = useState('');
	const { username, password } = input;

	useEffect(() => {
		document.title = 'Login';
	})

	useEffect(() => {
		setErrMsg('');
	}, [input])

	const handleClick = e => {
		setErrMsg('');
		setIsLoading(true);
		dispatch(signInStart(input));
	}

	const handleChange = e => {
		const { name, value } = e.target;

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
			<Button handleClick={handleClick} />
		</div>
	);
}

export default Login;
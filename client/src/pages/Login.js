import React, {useState, useEffect} from 'react';
import './Login.css';
import Input from '../components/Input';
import Button from '../components/ButtonWithSpinner';
import ErrMsg from '../components/ErrMsg';

import axios from 'axios';

function Login(props) {
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
		axios({
			method: "POST",
			data: {
				username,
				password
			},
			withCredentials: true,
			url: "http://localhost:4000/login",
		})
		.then(res => {
			setIsLoading(false);
			console.log(res)
		})
		.catch(err => {
			setIsLoading(false);
			setErrMsg('Username or password is incorrect.');
		});
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
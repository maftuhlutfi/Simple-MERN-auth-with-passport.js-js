import React, {useState, useEffect} from 'react';
import './Register.css';
import Input from '../components/Input';
import Button from '../components/ButtonWithSpinner';
import ErrMsg from '../components/ErrMsg';

function Register(props) {
	const [input, setInput] = useState({ username: '', password: '', confirmPassword: '' });
	const [errMsg, setErrMsg] = useState('');
	const { username, password, confirmPassword } = input;

	useEffect(() => {
		document.title = 'Login';
	})

	useEffect(() => {
		setErrMsg('');
	}, [input])

	const handleClick = e => {
		if (!(username && password && confirmPassword)) {
			setErrMsg('Please fill all input form.')
		} else if (password !== confirmPassword) {
			setErrMsg("Confirm password is not match.")
		} else {
			setErrMsg('')
		}
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
		<div className="register-page">
			<h1>Register</h1>
			<Input type='text' name='username' placeholder='Username' value={username} onChange={handleChange} />
			<Input type='password' name='password' placeholder='Password' value={password} onChange={handleChange} />
			<Input type='password' name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={handleChange} />
			{
				errMsg ? <ErrMsg text={errMsg} /> : ''
			}
			<Button handleClick={handleClick} />
		</div>
	);
}

export default Register;
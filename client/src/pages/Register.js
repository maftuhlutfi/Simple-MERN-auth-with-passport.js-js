import React, {useState, useEffect} from 'react';
import './Register.css';
import Input from '../components/Input';
import Button from '../components/ButtonWithSpinner';
import ErrMsg from '../components/ErrMsg';

import { useDispatch, useSelector } from 'react-redux';
import { signUpStart } from '../redux/actions/userActions';

import { selectIsLoading, selectErrMsg } from '../redux/selectors/userSelector';

function Register(props) {
	const dispatch = useDispatch();

	const [input, setInput] = useState({ username: '', password: '', confirmPassword: '' });
	const { username, password, confirmPassword } = input;
	const [errMsg, setErrMsg] = useState('');

	let errMsgRes = useSelector(state => selectErrMsg(state));
	const isLoading = useSelector(state => selectIsLoading(state));

	useEffect(() => {
		document.title = 'Register';
	})

	useEffect(() => {
		setErrMsg(errMsgRes)
	}, [errMsgRes])

	const handleClick = e => {
		if (!(username && password && confirmPassword)) {
			setErrMsg('Please fill all input form.')
		} else if (password !== confirmPassword) {
			setErrMsg("Confirm password is not match.")
		} else {
			setErrMsg('');
			const newUser = { username, password };
			dispatch(signUpStart(newUser));
		}
	}

	const handleChange = e => {
		setErrMsg('');
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
			<Button handleClick={handleClick} isLoading={isLoading} />
		</div>
	);
}

export default Register;
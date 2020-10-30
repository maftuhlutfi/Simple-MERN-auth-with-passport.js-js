import React from 'react';
import './ButtonWithSpinner.css'
import Spinner from './Spinner';

function ButtonWithSpinner({ handleClick, isLoading }) {
	return (
		<button onClick={handleClick}>
			{isLoading ? <Spinner /> : '→'}
		</button>
	);
}

export default ButtonWithSpinner;
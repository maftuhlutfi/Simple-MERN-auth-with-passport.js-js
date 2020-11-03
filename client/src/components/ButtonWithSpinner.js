import React from 'react';
import './ButtonWithSpinner.css'
import Spinner from './Spinner';

function ButtonWithSpinner({ handleClick, isLoading, label }) {
	return (
		<button onClick={handleClick}>
			{isLoading ? <Spinner /> : label || '→'}
		</button>
	);
}

export default ButtonWithSpinner;
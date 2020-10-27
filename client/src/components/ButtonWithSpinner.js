import React from 'react';
import './ButtonWithSpinner.css'

function ButtonWithSpinner({ handleClick }) {
	return (
		<button onClick={handleClick}>
			{/*isLoading ? <Spinner /> : '→'*/}
		</button>
	);
}

export default ButtonWithSpinner;
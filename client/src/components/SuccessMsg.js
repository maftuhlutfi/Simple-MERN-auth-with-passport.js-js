import React from 'react';
import './SuccessMsg.css';

function SuccessMsg({text}) {
	return (
		<span className='success-msg'>{text}</span>
	);
}

export default SuccessMsg;
import React from 'react';
import './ErrMsg.css';

function ErrMsg({text}) {
	return (
		<span className='err-msg'>{text}</span>
	);
}

export default ErrMsg;
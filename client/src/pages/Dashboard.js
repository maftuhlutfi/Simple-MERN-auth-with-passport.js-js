import {useEffect} from 'react';
import './Dashboard.css';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/selectors/userSelector';

function Dashboard(props) {
	const {username} = useSelector(state => selectCurrentUser(state));

	useEffect(() => {
		document.title = `Dashboard ${username}`;
	})

	return (
		<div className="dashboard">
			<h1>Hello {username}</h1>
		</div>
	);
}

export default Dashboard;
import { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './redux/actions/userActions';
import { selectCurrentUser } from './redux/selectors/userSelector';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => selectCurrentUser(state));

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path='/'
            exact
            render={() => currentUser ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
          />
          <Route 
            path='/login' 
            exact 
            render={() => currentUser ? (<Redirect to='/dashboard' />) : <Login />} 
          />
          <Route 
            path='/register' 
            exact 
            render={() => currentUser ? (<Redirect to='/dashboard' />) : <Register />} 
          />
          <Route 
            path='/dashboard' 
            exact 
            render={() => currentUser ? <Dashboard /> : <Redirect to='/login' />} 
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

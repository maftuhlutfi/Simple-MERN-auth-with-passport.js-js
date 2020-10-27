import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login' exact render={() => <Login />} />
          <Route path='/register' exact render={() => <Register />} />
          <Route path='/dashboard' exact render={() => <Dashboard />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

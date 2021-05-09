
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Components/Admin';
import AdminMain from './Components/AdminMain';
import Registration from './Components/Registration';
// const Api_key =process.env.REACT_APP_WEATHER_API_KEY
function App() {
  return (
    <div className="App">
      <Router>
      <AdminMain />
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/admin/addUser' component={Registration} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/admin/dashboard' component={Admin} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

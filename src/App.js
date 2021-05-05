
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Gmap from './Components/Gmap';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Components/Admin';

function App() {
  return (
    <div className="App">
   <Router>
                <div>
                    <Switch>
                    {/* <Route exact path='/oneUser' component={Map} />
                        <Route exact path='/' component={Admin} /> */}
                        
                        <Route exact path='/login' component={Login} />
                        {/* <Route exact path='/home' component={Home} /> */}
                        <Route exact path='/home' component={Gmap} />
                        <Route exact path='/Admin' component={Admin} />
                        {/* <Route exact path='/userPage' component={UserPage} /> */}
                    </Switch>
                </div>
            </Router>
    </div>
  );
}

export default App;

import react from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Vote from './components/Vote';
import Connexion from './components/Connexion';
import AddUser from './components/AddUser';
import SendResetPassword from './components/SendResetPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/vote" component={Vote} />
                    <Route exact path="/connexion" component={Connexion} />
                    <Route exact path="/addUSer" component={AddUser} />
                    <Route exact component={SendResetPassword} path='/resetPassword' />
                    <Route exact component={ResetPassword} path='/resetPassword/:userId/:token' />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
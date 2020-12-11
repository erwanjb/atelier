import react from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Vote from './components/Vote';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/vote" component={Vote} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Ecommerce from '../pages/Ecommerce';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/ecommerce" component={Ecommerce} />
                {/* Otras rutas */}
            </Switch>
        </Router>
    );
};

export default Routes;

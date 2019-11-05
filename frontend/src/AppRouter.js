import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EditUser from "./components/ediduser/editUser";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import React from "react";
import FandomHome from "./components/fandomhome/fandomhome"
import Search from './components/searchbar/search';

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className="col-md-6">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/editUser" component={EditUser} />
                        <Route path='/fandom/:fandomId' component={FandomHome}/>
                        <Route path='/search/:query' component={Search}/>
                        <Route path="/notFind" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

const style = {
    color: 'red',
    margin: '10px'
}

export default AppRouter;
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EditUser from "./components/ediduser/editUser";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Signup from "./components/signup/signup";
import React from "react";
import FandomHome from "./components/fandomhome/fandomhome"
import Search from './components/searchbar/search';
import CreateFandom from './components/createFandom/createFandom';
import Post from './components/post/post';
import PostHome from './components/post/posthome';
import About from './components/about/about';
import Event from './components/event/event';
import EventHome from './components/event/eventhome';
import EventMap from './components/eventMap/eventMap';

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path='/about' component={About}/>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/user/:email" component={EditUser} />
                        <Route path='/fandom/create' component={CreateFandom}/>
                        <Route classname="fandom" path='/fandom/:fandomId' exact component={FandomHome}/>
                        <Route path='/fandom/:fandomId/post' exact component={Post}/>
                        <Route classname="post" path='/fandom/:fandomId/post/:postId' component={PostHome}/>
                        <Route path='/fandom/:fandomId/event' exact component={Event}/>
                        <Route path='/fandom/:fandomId/event/:eventId/map' component={EventMap}/>
                        <Route path='/fandom/:fandomId/event/:eventId' component={EventHome}/>
                        <Route path='/search/:query' component={Search}/>
                        <Route path="/*" component={NotFound}/>
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
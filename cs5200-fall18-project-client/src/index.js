import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Container/Login";
import Home from "./Container/Home";
import Register from "./Container/Register";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Profile from "./Container/Profile";
import PublicProfile from "./Container/PublicProfile";
import Follower from "./Container/Follower";
import Following from "./Container/Following";
import Restaurant from "./Container/Restaurant";
import RestaurantPage from "./Container/RestaurantPage";
import Admin from "./Container/Admin";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/user/profile/:userId" component={PublicProfile} />
            <Route path="/restaurant/:restaurantId" component={Restaurant} />
            <Route path='/page/restaurant/:restId'
                   component={RestaurantPage}/>
            <Route path='/admin' component={Admin}/>

        </div>
    </Router>,
    document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

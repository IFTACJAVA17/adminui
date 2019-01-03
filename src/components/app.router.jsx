import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Start from './start.component';
import Games from './games.component';
import Settings from './settings.component';
import Users from './users.component';

const AppRouter = () => (
    <Router>
        <div>
            <Route path='/' exact component={Start} />
            <Route path='/Games' component={Games} />
            <Route path='/Settings' component={Settings} />
            <Route path='/Users' component={Users} />
        </div>
    </Router>
)

export default AppRouter;
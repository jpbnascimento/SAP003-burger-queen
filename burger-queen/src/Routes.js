import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/home';
import Cozinha from './Pages/Cozinha/cozinha'


const Routes = () => { 

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cozinha" component={Cozinha} />
            </Switch>
        </BrowserRouter>
    )

}   


export default Routes;
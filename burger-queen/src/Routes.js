import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/home';


const Routes = () => { 

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" com ponent={Home} />
            </Switch>
        </BrowserRouter>
    )

}   


export default Routes;
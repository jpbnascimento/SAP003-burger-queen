import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Salao from './Pages/Salao/salao';
import Cozinha from './Pages/cozinha';
import Home from './Pages/Home/Home';
import PedidosProntos from './Pages/PedidosProntos/pedidosProntos';

const Routes = () => { 

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cozinha" component={Cozinha} />
                <Route path="/salao" component={Salao} />
                <Route path="/pedidos-prontos" component={PedidosProntos} />
            </Switch>
        </BrowserRouter>
    )

}   


export default Routes;

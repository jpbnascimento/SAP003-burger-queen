import React from 'react';
// // import logo from './logo.svg';
// import './App.scss';
// import Home from './Pages/Home/home';


// function App() {
//   return (
//     <div className="App">
//       <Home />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Salao from './Pages/Salao/salao';
import Cozinha from './Pages/cozinha';
import Home from './Pages/Home/Home';


const Routes = () => { 

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cozinha" component={Cozinha} />
                <Route path="/salao" component={Salao} />
            </Switch>
        </BrowserRouter>
    )

}   


export default Routes;

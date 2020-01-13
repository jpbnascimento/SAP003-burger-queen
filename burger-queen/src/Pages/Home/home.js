import { Link } from 'react-router-dom';
import './home.scss';
import React from "react";

const Home = () => {

    return(
        <main className="home">
            <Link to= "/salao">
                <button>Salão</button>
            </Link>
            <Link to="/cozinha">
                <button>Cozinha</button>
            </Link>
        </main>
    )
}


export default Home;
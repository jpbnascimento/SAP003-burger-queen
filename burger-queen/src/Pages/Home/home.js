import { Link } from 'react-router-dom';
import './home.scss';
import React from "react";
import logo from "./img/logo-2.svg";

const Home = () => {

    return(
        <main className="home">
            <div className="conteudoPrincipal">
                <img src={logo}></img>
                <div className="botoes">
                    <Link to= "/salao">
                        <button>Salão</button>
                    </Link>
                    <Link to="/cozinha">
                        <button>Cozinha</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}


export default Home;
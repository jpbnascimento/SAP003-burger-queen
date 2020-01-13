import React from 'react';
import './salao.scss';

import MainSalao from '../../Components/MainSalao/mainSalao';
import Header from '../../Components/Header/header';

const Salao = () => {

    return(
        <div className="salao">
            <Header />
            <MainSalao />
        </div>
    )

}


export default Salao;
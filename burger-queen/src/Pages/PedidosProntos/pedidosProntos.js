import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import Header from "../../Components/Header/header";
import voltar from "./img/retorna.png";
import { Link } from 'react-router-dom';
import "./pedidosProntos.scss";

const PedidosProntos = () => {

    const [items, setItems] = useState([]);

    function carregarDados(){
      firebaseApp
        .firestore()
        .collection("cliente")
        .orderBy("tempo", "asc")
        .get()
        .then(snap => {
          const newItems = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setItems(newItems);
  
        });
    };
  
    useEffect(() => {
      carregarDados();
    }, []);

    function duracao(item) {
        const horas = Math.floor(item.tempoDePreparo / 60);
        const minutos = item.tempoDePreparo % 60;
        return `Duração: ${horas}:${minutos}:00 h`;
    }

    function pedidoEntregue(item){
        const newDate = new Date();
        const tempoDePreparo = parseInt((newDate - item.tempo.toDate())  / 60000);

  
        const pedidoEnviado = {
          tempoDePreparo,
          status: "Entregue"
        };
  
        firebaseApp.firestore().collection("cliente").doc(item.id).update(pedidoEnviado)
        carregarDados();
      }

  return (
    <main>
      <Header />
      <Link className="salaoVoltar" to= "/Salao"><img src={voltar}></img></Link>
      <h1>Pedidos prontos</h1>
     <div className="containerPedidos">
        {items.map((item) => (
            ( item.status ? 
          <div className="pedidoEmPreparo">
          <span className="nomeCliente"> Cliente: {item.cliente} </span>
          <span> Mesa: {item.mesa} </span>
          <span> Pedido às {item.tempo.toDate().toLocaleString('pt-br').substring(10, 16)} h</span>
          {item.status == "Entregue" ?  duracao(item) : null}
          <div className="produtoUnitario">
            {item.pedido.map(el => (
              <div className="detalhePedido">
                <span>
                  {el.contador} un 
                </span>
                <p>{el.nome}</p>
                <span>
                </span> {el.adicionalEscolhido && <p> Adicional de : {el.adicionalEscolhido}</p>}
              </div>
            ))}
          </div>
          <p>Valor Total do pedido: R$ {item.total} ,00 </p>
          <span className="botaoEnviar">
            {item.status == "Pronto" ? <button onClick={ () => pedidoEntregue(item) }>Entregar</button> : <span className="entregue">Entregue</span>}
          </span>  
        </div> : null ) 
        ))},
      </div>
    </main>
  );
};

export default PedidosProntos;

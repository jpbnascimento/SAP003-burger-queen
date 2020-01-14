import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import "./mainCozinha.scss";

const MainCozinha = () => {

  const [items, setItems] = useState([]);

  function carregarDados(){
    console.log("Oie")
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

        console.log(newItems)

      });
  };

  useEffect(() => {
    carregarDados();

  }, []);

  function pedidoPronto(item){
      const newDate = new Date();
      const tempoDePreparo = parseInt((newDate - item.tempo.toDate())  / 60000);
      
      // const horas = Math.floor(tempoDePreparo / 60);
      // const minutos = tempoDePreparo % 60;
      // console.log(horas, minutos);


      const pedidoEnviado = {
        tempoDePreparo,
        status: "Pronto"
      };

      firebaseApp.firestore().collection("cliente").doc(item.id).update(pedidoEnviado)
      carregarDados();
    }

  return (
    <main>
      <div className="containerPedidos">
        {items.map((item, index) => (
          <div className="pedidoEmPreparo">
          <span className="nomeCliente"> Cliente: {item.cliente} </span>
          <span> Mesa: {item.mesa} </span>
          <span> Pedido às {item.tempo.toDate().toLocaleString('pt-br').substring(10, 16)} h</span>
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
            { !item.status ? <button onClick={ () => pedidoPronto(item) }>Pronto</button> : <p>Otimo</p>}
          </span>  
        </div>
        ))}
      </div>
    </main>
  );
};

export default MainCozinha;

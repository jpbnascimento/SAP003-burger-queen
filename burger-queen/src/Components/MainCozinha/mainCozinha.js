import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import "./mainCozinha.scss";

const MainCozinha = () => {

  const [items, setItems] = useState([]);
  const [tipoMenu, setTipoMenu] = useState([]);

  useEffect(() => {
    firebaseApp
      .firestore()
      .collection("cliente")
      .get()
      .then(snap => {
        const newItems = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setItems(newItems);

        console.log(newItems)

      });
  }, []);


  function pedidoPronto(item){
      const newDate = new Date();
      const tempoDePreparo = parseInt((newDate - item.tempo.toDate())  / 60000);
      console.log(tempoDePreparo)
      console.log(item.tempo.toDate())
      console.log(item)

      const pedidoEnviado = {
        tempoDePreparo,
        status: "Pronto"
      };

      firebaseApp.firestore().collection("cliente").doc(item.id).update(pedidoEnviado)
    }

  return (
    <main>
      <div>
        {items.map((item, index) => (
          <>
            {item.tempo.toDate().toLocaleString('pt-br').substring(10, 16)}
            {item.cliente}
            {item.mesa}
            {item.pedido.map(el => (
              <div>
                <p>{el.nome}</p>
                {el.adicionalEscolhido && <p>{el.adicionalEscolhido}</p>}
                {el.contador}
              </div>
            ))}
            R$ {item.total} ,00
            <button onClick={ () => pedidoPronto(item) }>Pronto</button>
        </>
        ))}
      </div>
    </main>
  );
};

export default MainCozinha;

import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import "./header.scss";

const Header = () => {
  const [pedido, setPedidos] = useState([]); // 2 - mudar para dicionario
  const [tipoMenu, setTipoMenu] = useState([]);
  const [menuAtivo, setMenuAtivo] = useState("lanche");


  function incluirPedidos(event) {
    const pedido1 = event.target.innerHTML; // 1 - passar op parametro ex: <p id={index} onClick={()=>{setMenuAtivo(item)}}>

    setPedidos([...pedido, pedido1]);  // 2 - mudar para dicionario
  }

  function excluirPedido(event) { // 3 - Decrementar o contador do dicionario TAMBEM usar parametro
    const excluido = pedido[event.target.parentNode.id];
    const qualquer = pedido.filter(item => {
      return item != excluido;
    });

    setPedidos(qualquer);
  }

// 4 - Salvar dicionario de pedidos com mesa e nome do usuarione E  status

  const [items, setItems] = useState([]);

  useEffect(() => {
    firebaseApp
      .collection("menu")
      .get()
      .then(snap => {
        const newItems = snap.docs.map(doc => ({
          ...doc.data()
        }));
        const temptipos = snap.docs.map(doc => {
          return doc.data()["menu"];
        });
        const tipos = [...new Set(temptipos)];
        console.log(tipos);
        setItems(newItems);
        setTipoMenu(tipos);
      });
  }, []);

  return (
    <>
      <div className="tippMenu">
        {tipoMenu.map((item, index) => (
          <p  id={index} onClick={()=>{setMenuAtivo(item)}}>
            {item}
          </p>
        ))}
      </div>
      <div className="header">
        {items.map((item, index) => (
          (item.menu === menuAtivo && 
          <div className="itens" onClick={incluirPedidos}>
            <p>
              {item.nome} 
            </p>
            <p>
             R$ {item.valor}
            </p>
          </div>
          )
        ))}
      </div>
      <div className="pedido">
        <strong>Pedido:</strong>
        <div>
          {pedido.map((item, index) => (
            <p id={index}>
              {item}
              <button onClick={excluirPedido}>X</button>
            </p>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Header;

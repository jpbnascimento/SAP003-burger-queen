import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import "./header.scss";
import logo from "./Pasta Sem Título/logo-2.svg"

const Header = () => {
  const [pedido, setPedidos] = useState([]);
  const [tipoMenu, setTipoMenu] = useState([]);
  const [menuAtivo, setMenuAtivo] = useState("lanche");

console.log(pedido);

  function incluirPedidos(item) {
    if(pedido.some(el => el.nome === item.nome)){
      console.log(item.contador)
      item.contador++
      setPedidos([...pedido]);
    } else {
      item.contador = 1
      setPedidos([...pedido, item]);
    }
  }

  function decremento(item) {
    if(item.contador == 1){
      const qualquer = pedido.filter(minie => {
        return minie != item;
      });
      setPedidos(qualquer);

    } else {
      item.contador --
      setPedidos([...pedido]);
    }
  }

  function incremento(item) {
   
      item.contador ++
      setPedidos([...pedido]);
    
  }

  function excluirPedido(event) {
    const excluido = pedido[event.target.parentNode.id];
    console.log(excluido);
    const qualquer = pedido.filter(item => {
      return item != excluido;
    });

    setPedidos(qualquer);
  }

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
          // console.log(tipos);
          setItems(newItems);
          setTipoMenu(tipos);
        });
    }, []);

    const total = pedido.reduce((acc, item)=> acc + (item.contador * item.valor), 0)

  return (
    <>
      <img className="logo" src={logo}></img>
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
          <div className="itens" onClick={() => incluirPedidos(item)}>
            <p>
              {item.nome} 
              {item.adicional?item.adicional.map((i) => <label><input name="adicional" type="radio"/>{i}</label>): "" }
        {item.opcoes?item.opcoes.map((i, index) => <label><input name="opcao" type="radio"/>{i}</label>): "" }
              R$ {item.valor},00
            </p>
          </div>
          )
        ))}
      </div>
      <div className="pedido">
        <strong>Pedido:</strong>
        <label>Cliente: </label>
        <input type="text"></input>
        <label>Mesa: </label>
        <input type="number"></input>
        <div>
          {pedido.map((item, index) => (
            <p id={index}>
              {item.nome}
             R$  {item.valor},00
              <button onClick={excluirPedido}>X</button>
              <button onClick={() => incremento(item)}> + </button>
              <span> {item.contador} </span>
              <button onClick={() => decremento(item)}> - </button>
         
            </p>
          ))}
        </div>
          <span>{total}</span>
          <button>Enviar Pedido</button>
      </div>
      
    </>
  );
};

export default Header;

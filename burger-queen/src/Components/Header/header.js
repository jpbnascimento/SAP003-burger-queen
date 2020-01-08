import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import "./header.scss";
import logo from "./Pasta Sem Título/logo-2.svg"

const Header = () => {
  const [pedido, setPedidos] = useState([]);
  const [tipoMenu, setTipoMenu] = useState([]);
  const [menuAtivo, setMenuAtivo] = useState("lanche");
  const [cliente, setCliente] = useState("");
  const [mesa, setMesa] = useState('');
  const [total, setTotal] = useState("");
  const [opcao, setOpcao] = useState("");
  const [adicional, setAdicional] = useState("nenhum");


console.log(pedido);

  function incluirPedidos(item) {
    item.opcaoEscolhida = opcao
    item.adicionalEscolhido = adicional
    if(pedido.some(el => el.nome === item.nome)){
      setPedidos([...pedido]);
    } else {
      item.contador = 1
      console.log(item)
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
      firebaseApp.firestore()
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
          setItems(newItems);
          setTipoMenu(tipos);
        });
    }, []);

    const totalAPagar = pedido.reduce((acc, item)=> acc + (item.contador * item.valor), 0)

    function enviarPedido(e){
      e.preventDefault()
      console.log(mesa);
      console.log(cliente);

      const pedidoEnviado = {
        cliente,
        mesa: parseInt(mesa),
        pedido,
        total: totalAPagar,

      }

      firebaseApp.firestore().collection("cliente").add(pedidoEnviado)
      setMesa("");
      setCliente("");
      setPedidos([]);
      setTotal("");
    }
    

  return (
    <div className="garcom">
      <header className="logo">
        <img src={logo}></img>
      </header>
      <main className="containerRealizarPedido">
        <section>
          <div className="tipoMenu">
            {tipoMenu.map((item, index) => (
              <button className="tipo"  id={index} onClick={()=>{setMenuAtivo(item)}}>
                {item}
              </button>
            ))}
          </div>
          <div className="cardapio">
            {items.map((item, index) => (
              (item.menu === menuAtivo && 
              <div className="itens" onClick={() => incluirPedidos(item)}>
                <div className="itensCardapio">
                  <p>
                    {item.nome}
                  </p> 
                  <p>
                    {item.opcoes?item.opcoes.map((i, index) => <label><input value={i} onChange={e => setOpcao(i)} name="opcao" type="radio"/>{i}</label>): "" }
                  </p>
                  <p>
                    {item.adicional?item.adicional.map((i) => <label><input value={i} onChange={e => setAdicional(i) } name="adicional" type="radio"/>{i}</label>): "" }
                  </p>
                  <p>
                    R$ {item.valor},00
                  </p>
                </div>
              </div>
              )
            ))}
          </div>
        </section>
        <section className="detalhePedido">
          <strong>Detalhe do pedido</strong>
            <div>
              <label >Cliente: </label>
              <input state="cliente" type="text" onChange={ e => setCliente(e.currentTarget.value)} value={cliente}></input>
              <label >Mesa: </label>
              <input state="mesa" type="number" onChange={ e => setMesa(e.currentTarget.value)} value={mesa}></input>
            </div>
            <div>
              {pedido.map((item, index) => (
                <p id={index}>
                  {item.nome}
                  <span>{item.adicionalEscolhido}</span>
                  <span >{item.opcaoEscolhida}</span>
                
                  <button onClick={excluirPedido}>X</button>
                  <button onClick={() => incremento(item)}> + </button>
                  <span> {item.contador} </span>
                  <button onClick={() => decremento(item)}> - </button>
                  <p>
                    R$ {item.valor},00
                  </p>
                </p>
              ))}
            </div>
            <div className="total">
              <span state="total"><strong>Total a pagar : R$ {totalAPagar} ,00</strong></span>
              <button className="enviar" onClick={ enviarPedido } >Enviar Pedido</button>
            </div>
        </section> 
      </main>
    </div>
  );
};

export default Header;

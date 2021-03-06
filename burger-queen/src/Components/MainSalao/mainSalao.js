import React, { useState, useEffect } from "react";
import firebaseApp from "../../Firebase";
import "./mainSalao.scss";
import { Link } from "react-router-dom";

import lixo from "./img/excluir.png"

const MainSalao = () => {
  const [pedido, setPedidos] = useState([]);
  const [tipoMenu, setTipoMenu] = useState([]);
  const [menuAtivo, setMenuAtivo] = useState("lanche");
  const [cliente, setCliente] = useState("");
  const [mesa, setMesa] = useState('');
  const [total, setTotal] = useState("");
  const [adicional, setAdicional] = useState(false);


console.log(pedido);

  function incluirPedidos(item) {
    item.adicionalEscolhido = adicional
    setAdicional(false)
    var i;
    for (i = 0; i < pedido.length; i++){
      if (get_name(pedido[i]) === get_name(item))
      {
        pedido[i].contador++ 
        setPedidos([...pedido])
        return
      }
    }

    item.contador = 1
    console.log(item)
    setPedidos([...pedido, {...item}]);
    
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

  function get_name(item) {
    let nome = item.nome;
    if(item.adicionalEscolhido){
      nome += item.adicionalEscolhido
    }
    return nome;
  }
    function get_preco_individual(item){
      let novoPreco = item.valor;
      if(item.adicionalEscolhido){
        novoPreco += 1;
      }
      return novoPreco;
    }

  function get_preco(item){
    return get_preco_individual(item) * item.contador;
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

    const totalAPagar = pedido.reduce((acc, item)=> acc + get_preco(item), 0);
    console.log(totalAPagar)

    function enviarPedido(e){
      e.preventDefault()
      console.log(mesa);
      console.log(cliente);
      const newDate = new Date();

      const pedidoEnviado = {
        cliente,
        mesa: parseInt(mesa),
        pedido,
        total: totalAPagar,
        tempo: newDate

      };

      firebaseApp.firestore().collection("cliente").add(pedidoEnviado)
      setMesa("");
      setCliente("");
      setPedidos([]);
      setTotal("");
    }
    

  return (
      <div className="mainSalao">
        <Link className="botaoPedidosProntos"  to="/pedidos-prontos">
          <span>Pedidos Prontos</span>
        </Link>
        <div className="containerRealizarPedido">
        <section className="CardapioRestaurante">
          <div className="tipoMenu">
            {tipoMenu.map((item, index) => (
              <button className="tipo"  id={index} onClick={()=>{setMenuAtivo(item)}}>
                {item}
              </button>
            ))}
          </div>
          <div className="cardapio">
            {items.map((item, index) => 
              (item.menu === menuAtivo) ? (
                item.adicional ? (
                  <div className="itens" >
                  <div className="itensCardapio">
                    <p className="nome">
                      {item.nome}
                    </p> 
                    <div className="adicional">
                      <p className="adicionalUnitario">
                      <span> Adicional: </span>
                        {item.adicional?item.adicional.map((i) => <label><input value={i} onChange={e => setAdicional(i) } name="adicional" type="radio"/>{i}</label>): "" }
                      
                      </p>
                      <p>
                        R$ {item.valor},00
                      </p>
                      <button className="adicionar" onClick={() => incluirPedidos(item)}>Adicionar</button>
                    </div>
                  </div>
                </div>
                ) : (
                  <div className="itens" onClick={() => incluirPedidos(item)}>
                  <div className="itensCardapio">
                    <p className="nome">
                      {item.nome}
                    </p> 
                    <p>
                      R$ {item.valor},00
                    </p>
                  </div>
                </div>
                )) : false
              
               
            )}
          </div>
        </section>
        <section className="detalhePedido">
          <strong className="detalhe">Detalhe do pedido:</strong>
            <div className="DadosMesa">
             
               
                <input placeholder="Cliente" state="cliente" type="text" onChange={ e => setCliente(e.currentTarget.value)} value={cliente}></input>
            
              
              
                <input placeholder="N° mesa" state="mesa" type="number" onChange={ e => setMesa(e.currentTarget.value)} value={mesa}></input>
              
            </div>
            <div className="receberPedido">
              {pedido.map((item, index) => (
                <div id={index}>
                  {get_name(item)}
                  <span>
                    <img src={lixo} onClick={excluirPedido}></img>
                    <button onClick={() => incremento(item)}> + </button>
                    <span> {item.contador} </span>
                    <button onClick={() => decremento(item)}> - </button>
                  </span>
                  <p>
                   Valor: R$ {get_preco_individual(item)},00
                  </p>
                </div>
              ))}
            </div>
            <div className="total">
              <span state="total"><strong>Total a pagar : R$ {totalAPagar} ,00</strong></span>
            </div>
              <button className="enviar" onClick={ enviarPedido } >Enviar Pedido</button>
        </section> 
        </div>
      </div>
  );
};

export default MainSalao;

import React,{useState, useEffect} from 'react';
import firebaseApp from '../../Firebase';
import "./header.scss"

const Header = () => {

  const [pedido, setPedidos] = useState([])
  const [tipoMenu, setTipoMenu] = useState("")


  function incluirPedidos(event) {
    const pedido1 = event.target.innerHTML

    setPedidos([...pedido, pedido1])
  } 

  function excluirPedido(event) {
    const excluido = pedido[event.target.parentNode.id];
    const qualquer = pedido.filter((item)=> {
       return item != excluido
    })
    
    setPedidos(qualquer)
  }


  const [items, setItems] = useState([])
  
  useEffect(() => {
    firebaseApp.collection('menu').get()
    .then((snap) => {
      const newItems = snap.docs.map((doc) => ({
       ...doc.data()
      }))
      setItems(newItems)
    })
    
  },[])  
  
  return (
    <>
    <div className="header">
      {items.map((item, index)=> (
        <div className="itens" onClick={incluirPedidos}>
          <p >{item.nome} {item.valor}</p>
        </div> 
      
  ))}
      </div>
      <strong>Pedido:</strong>
      <div>
      {pedido.map((item, index) => <p id={index}>{item} 
      <button onClick={excluirPedido}>X</button></p>)}
      </div>
      </>
  )
}

export default Header;
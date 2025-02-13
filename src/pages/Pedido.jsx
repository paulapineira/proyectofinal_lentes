import React, { useContext, useState } from 'react';
import { Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { PedidoContext } from '../context/PedidoContext'; 
import { useUser } from '../context/UserContext';

const Pedido = () => {
  const { pedido, addToPedido, removeFromPedido, getTotal } = useContext(PedidoContext);
  const { token } = useUser();
  const [successMessage, setSuccessMessage] = useState('');

  const increaseQuantity = (id) => {
    const lente = pedido.find(lente => lente.id === id);
    if (lente) {
      addToPedido({ ...lente, quantity: lente.quantity + 1 });
    }
  };

  const decreaseQuantity = (id) => {
    const lente = pedido.find(lente => lente.id === id);
    if (lente) {
      removeFromPedido(id);
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      alert('Debes iniciar sesión para realizar la compra.');
      return;
    }
    const pedidoData = { pedido }; // Estos son los datos que para mandar
    console.log('Enviando pedido de compras:', pedidoData); // console-log para ver si se esta enviando el pedido o no
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({pedido }),
      });
      
      if (response.ok) {
        setSuccessMessage('Compra realizada con éxito!');
      } else {
        throw new Error('Error al procesar la compra');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un problema con la compra. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="Pedidocontainer">
      <h1 className="text-center my-4">Mi Pedido</h1>
      {pedido.length === 0 ? (
        <h4 className="text-center">Tu pedido está vacío</h4>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center mt-4 mb-4">
            <h3>Total: ${getTotal()}</h3>
            <Button variant="success" className="mt-3" onClick={handleCheckout}>Pagar</Button>
          </div>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Row className="mb-4">
            {pedido.map(lente => (
              <Col key={lente.id} xs={12} md={4} className="mb-4">
                <Card className="lente-card">
                  <Card.Img variant="top" src={lente.img} />
                  <Card.Body>
                    <Card.Title>{lente.name}</Card.Title>
                    <Card.Text>Precio: ${lente.price.toFixed(0)}</Card.Text>
                    <Card.Text>Cantidad: {lente.quantity}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="secondary" onClick={() => decreaseQuantity(lente.id)} disabled={lente.quantity === 0}> - </Button>
                      <Button variant="primary" onClick={() => increaseQuantity(lente.id)} > + </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default Pedido;






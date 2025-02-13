import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PedidoContext } from '../context/PedidoContext';
import { Link } from 'react-router-dom';

const CardLente = ({ lente: lente }) => {
  const { id, name, desc, price, img } = lente;
  const { addToPedido, pedido } = useContext(PedidoContext);


  const isInPedido = pedido.some(item => item.id === id);

  const handleAddToPedido = () => {
    addToPedido({ id, name, desc, price, img });
  };

  return (
    <Card className="lente-card">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title className="card-title">{name}</Card.Title>
        <hr className="divider" />
        <Card.Text className="description-text">{desc}</Card.Text>
        <hr className="divider" />
        <Card.Text className="price-text">Precio: ${price.toLocaleString()}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
         {/*  <Button variant="light">Ver Más</Button> */}
         <Link to={`/lente/${id}`} style={{ textDecoration: 'none' }}>
            <Button variant="light">Ver Más</Button>
          </Link>
          <Button 
            variant={"dark"} onClick={handleAddToPedido}>{'Añadir 🛒'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardLente;









import React, { useContext } from 'react';
import Header from '../components/Header';
import CardLente from '../components/CardLente';
import { Row, Col } from 'react-bootstrap';
import { LenteContext as LenteContext } from '../context/LenteContext';

const Home = () => {
  const { lentes: lentes } = useContext(LenteContext);

  if (!lentes.length) return <p className="text-center my-4">Cargando lentes...</p>;

  return (
    <div className="homecontainer">
      <Header />
      <h1 className="text-center my-4">Lista de Lentes</h1>
      <Row>
        {lentes.map(lentes => (
          <Col key={lentes.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
            <CardLente lente={lentes} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;










import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Lente.css'; 

const Lente = () => {
  const { id } = useParams();
  const [lente, setLente] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchLente = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/lentes/${id}`);
        if (!response.ok) {
          throw new Error('Error al hacer fetch en el lente');
        }
        const data = await response.json();
        setLente(data);
      } catch (error) {
        console.error('Error de fetch en el lente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLente();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!lente) {
    return <p>No se encontró el lente que esta buscando.</p>;
  }

  return (
    <div className="lente-singular">
      <img src={lente.img} alt={lente.name} className="lente-img" />
      <div className="lente-info">
        <h1 className="lente-name">{lente.name}</h1>
        <p className="lente-desc">{lente.desc}</p>
        <p className="lente-price">${lente.price}</p>
        <button className="add-to-pedido-button" onClick={() => alert('El lente ha sido añadido al pedido')}>
        Añadir 🛒
        </button>
      </div>
    </div>
  );
};

export default Lente;









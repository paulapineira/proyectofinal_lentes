import { createContext, useState, useCallback } from 'react';

export const PedidoContext = createContext();

const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState([]);
  const addToPedido = useCallback((lente) => {
    setPedido((prevPedido) => {
      const index = prevPedido.findIndex(item => item.id === lente.id);
      if (index !== -1) {
        const newPedido = [...prevPedido];
        newPedido[index].quantity += 1;
        return newPedido;
      } else {
        return [...prevPedido, { ...lente, quantity: 1 }];
      }
    });
  }, []);
  const removeFromPedido = useCallback((lenteId) => {
    setPedido((prevPedido) => {
      const index = prevPedido.findIndex(item => item.id === lenteId);
      if (index === -1) return prevPedido;

      const newPedido = [...prevPedido];
      if (newPedido[index].quantity > 1) {
        newPedido[index].quantity -= 1;
      } else {
        return newPedido.filter(item => item.id !== lenteId);
      }
      return newPedido;
    });
  }, []);
  const getQuantity = useCallback(() => {
    return pedido.reduce((acc, item) => acc + item.quantity, 0);
  }, [pedido]);
  const getTotal = useCallback(() => {
    return pedido.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(0);
  }, [pedido]);

  return (
    <PedidoContext.Provider value={{ pedido, addToPedido, removeFromPedido, getTotal, getQuantity }}>
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoProvider;





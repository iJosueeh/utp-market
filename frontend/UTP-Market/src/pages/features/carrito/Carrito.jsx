import React, { useState } from 'react';

const Carrito = () => {
  // Datos de ejemplo
  const items = [
    { id: 1, producto: 'Guia de calculo I', categoria: 'Guias de estudio', precio: 10.00, cantidad: 1, estilo: 'bi-book' },
    { id: 2, producto: 'Chocotejas de oreo', categoria: 'Snack', precio: 15.50, cantidad: 3, estilo: 'bi-fork-knife' },
    { id: 3, producto: 'Tutoria de python', categoria: 'Tutorias', precio: 5.75, cantidad: 1, estilo: 'bi-laptop' },
  ];

  const [filledIcons, setFilledIcons] = useState({});

  const handleIconClick = (itemId, iconType) => {
    const key = `${itemId}-${iconType}`;
    setFilledIcons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
      <table className="w-100 bg-white border border-dark" style={{ borderRadius: '10px', overflow: 'hidden', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead className='bg-dark'>
          <tr> 
            <th className="py-2 px-4 border border-dark text-white">Producto</th>
            <th className="py-2 px-4 border border-dark text-white">Cantidad</th>
            <th className="py-2 px-4 border border-dark text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isTrashFilled = filledIcons[`${item.id}-trash`];
            const isStarFilled = filledIcons[`${item.id}-star`];

            return (
              <tr key={item.id} style={{ backgroundColor: '#FFFFFF' }}>
                <td className="py-2 px-4 border border-dark">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-4" style={{ backgroundColor: '#B50D30', width: '3rem', height: '3rem' }}>
                      <i className={`bi ${item.estilo} fs-4 text-white`}></i>
                    </div>
                    <div>
                      <div className="fw-bold">{item.producto}</div>
                      <small className="text-muted">{item.categoria}</small>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border border-dark text-center">{item.cantidad}</td>
                <td className="py-2 px-4 border border-dark text-center">
                    <div className="d-flex justify-content-center">
                  <button className="btn btn-link text-dark me-2" onClick={() => handleIconClick(item.id, 'trash')}>
                    <i 
                      className={isTrashFilled ? 'bi bi-trash-fill' : 'bi bi-trash'} 
                      style={{ color: isTrashFilled ? '#B50D30' : 'inherit' }}
                    ></i>
                  </button>
                  <button className="btn btn-link text-dark" onClick={() => handleIconClick(item.id, 'star')}>
                    <i 
                      className={isStarFilled ? 'bi bi-star-fill' : 'bi bi-star'} 
                      style={{ color: isStarFilled ? '#B50D30' : 'inherit' }}
                    ></i>
                  </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );
};

export default Carrito;

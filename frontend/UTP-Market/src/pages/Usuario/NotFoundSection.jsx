
import React from 'react';

const NotFoundSection = () => {
  return (
    <div className="text-center p-5">
      <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem', color: '#B50D30' }}></i>
      <h3 className="mt-3">Panel o sección no disponible</h3>
      <p className="text-muted">La sección que estás intentando ver no se encuentra disponible en este momento.</p>
    </div>
  );
};

export default NotFoundSection;

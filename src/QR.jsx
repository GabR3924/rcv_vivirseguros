import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const QR = () => {
  const location = useLocation();
  const [tienda, setTienda] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get('data');
    const error = params.get('error');

    if (data) {
      setTienda(JSON.parse(decodeURIComponent(data)));
    } else if (error) {
      setError(decodeURIComponent(error));
    }
  }, [location.search]);

  return (
    <div>
      {tienda ? (
        <div>
          <h1>{tienda.NOMBRE}</h1>
          {/* Mostrar más información de la tienda */}
        </div>
      ) : (
        <div>
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default QR;

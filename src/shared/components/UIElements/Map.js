import React, {useRef, useEffect} from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  const {center, zoom} = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    }); // mbola misy an le Script tokony ajouter-na 
    // any amn index.html any amn public
  
    new window.google.maps.Marker({posistion : center, map: map});
  }, [center, zoom]);

  

  return (
    <div 
      ref={mapRef}
      className={`map ${props.className}`} 
      style={props.style}     
    >

    </div>
  );
};

export default Map;
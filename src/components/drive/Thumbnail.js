import React from 'react';

const Thumbnail = ({ url, alt }) => {
  return (
    <div className="thumbnail-container d-flex justify-content-center align-items-center">
      <img src={url} alt={alt} className="thumbnail-image" />
    </div>
  );
};

export default Thumbnail;
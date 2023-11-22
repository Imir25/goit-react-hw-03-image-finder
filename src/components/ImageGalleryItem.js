import React from 'react';

const ImageGalleryItem = ({ imageUrl, imageAlt }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={imageUrl} alt={imageAlt} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
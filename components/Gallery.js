import { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";

const ImageGallery = ({ images }) => {
  return <Gallery images={images} />;
};

export default ImageGallery;

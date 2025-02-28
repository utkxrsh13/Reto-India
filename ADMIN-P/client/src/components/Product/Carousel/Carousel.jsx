import React from 'react';
import './Carousel.css';
const Carousel = ({ slides }) => {
  if (!slides || slides.length === 0) return <p>No images to display</p>;

  return (
    <div className="carousel flex overflow-auto ">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={`http://localhost:3000${slide}`}
          alt={`Slide ${index + 1}`}
          className="image object-cover px-2 py-2"
        />
      ))}
    </div>
  );
};

export default Carousel;

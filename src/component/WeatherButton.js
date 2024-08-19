import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, getCurrentLocation }) => {
  const [activeIndex, setActiveIndex] = useState(null); // Track the index of the active button

  return (
    <div>
      <Button
        className='location-btn'
        variant={activeIndex === 'current' ? 'dark' : 'warning'}
        onClick={() => {
          getCurrentLocation();
          setActiveIndex('current'); // Set 'current' as the active index
        }}
      >
        Current Location
      </Button>
      {cities.map((city, index) => {
        return (
          <Button
            key={index}
            className='location-btn'
            variant={activeIndex === index ? 'dark' : 'warning'}
            onClick={() => {
              setCity(city);
              setActiveIndex(index); // Set the clicked button's index as active
            }}
          >
            {city}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;

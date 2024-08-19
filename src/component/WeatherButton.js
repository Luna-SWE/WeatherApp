import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  // console.log(cities);

  return (
    <div>
      <Button className='location-btn' variant='warning'>
        Current Location
      </Button>
      {cities.map((city, index) => {
        return (
          <Button
            key={index}
            className='location-btn'
            variant='warning'
            onClick={() => {
              setCity(city);
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

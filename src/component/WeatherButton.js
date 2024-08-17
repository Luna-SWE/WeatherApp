import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
      <Button className='location-btn' variant='warning'>
        Current Location
      </Button>
      <Button className='location-btn' variant='warning'>
        London
      </Button>
      <Button variant='warning'>Paris</Button>
    </div>
  );
};

export default WeatherButton;

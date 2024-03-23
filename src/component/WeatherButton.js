import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
      <Button variant="warning">Current Location</Button>
      <Button variant="warning">Seoul</Button>
      <Button variant="warning">Tokyo</Button>
      <Button variant="warning">NewYork</Button>
    </div>
  );
};

export default WeatherButton;

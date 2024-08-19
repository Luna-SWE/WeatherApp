import { useCallback, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

const API_KEY = 'f6af0e035627b45f0359d8498db17827';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ['Paris', 'London', 'New York', 'Seoul'];

  const getWeatherByCurrentLocation = useCallback(async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }, []);

  const getWeatherByCity = useCallback(async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }, []);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, [getWeatherByCurrentLocation]);

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity(city);
    }
  }, [getCurrentLocation, getWeatherByCity, city]);

  return (
    <div>
      <div className='container'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </div>
  );
}

export default App;

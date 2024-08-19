import { useCallback, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

const API_KEY = 'f6af0e035627b45f0359d8498db17827';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cities = ['Paris', 'London', 'New York', 'Seoul'];

  const getWeatherByCurrentLocation = useCallback(async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setIsLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setIsLoading(false);
  }, []);

  const getWeatherByCity = useCallback(async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setIsLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setIsLoading(false);
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
        {isLoading ? (
          <ClipLoader
            color='tomato'
            loading={isLoading}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        ) : (
          <WeatherBox weather={weather} />
        )}
        <WeatherButton
          cities={cities}
          setCity={setCity}
          getCurrentLocation={getCurrentLocation}
        />
      </div>
    </div>
  );
}

export default App;

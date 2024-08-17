import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import { WeatherButton } from './component/WeatherButton';

// 유저는 현재 위치의 날씨를 볼 수 있다.(지역, 온도, 날씨 상태)
// 유저는 다른 도시의 버튼들을 볼 수 있다.
// 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다.
// 유저는 데이터가 로딩될 때 로딩 스피너를 볼 수 있다.

function App() {
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log('current location:', lat, log);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f6af0e035627b45f0359d8498db17827
`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <div>
      <div className='container'>
        <WeatherBox />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;

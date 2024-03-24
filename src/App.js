import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

/*

1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른 도시)
4. 도버튼을 클릭할 때 마 도별 날씨가 나온다.
5. 현위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
6. 데터를 들고 오는 동안 로딩 스피너가 돈다.

*/

function App() {
  const APIkey = `cc074568a716e634daab72e2694d940c`;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const cities = ['paris', 'new york', 'tokyo', 'seoul '];
  const [apiError, setAPIError] = useState('');

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <>
      <div className="container vh-100">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader color="#f86c6b" size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div class="main-container">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
          </div>
        ) : (
          apiError
        )}
      </div>
    </>
  );
}

export default App;

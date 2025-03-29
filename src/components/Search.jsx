import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../store/ThemeContext';
import axios from 'axios';
import '../styles/Search.css';
import moon from "../assets/moon.svg";
import day from "../assets/light.svg";
import searchSymbol from "../assets/search.svg";
const Search = () => {
  const [city, setCity] = useState('Phagwara');
  const { toggleTheme, theme, weatherDetails, loading, setLoader, setHistory } = useContext(ThemeContext);
  const [error, setError] = useState(null);
  function validate() {
    if (city.trim() === '') {
      alert('Please enter a city name');
      return false;
    }
    return true;
  }
  
  async function findCity() {
    if (!validate()) return;

    try {
      setLoader(true);
      setError(null);
      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e1bc59a7f8100b801027f2f28d22c225&units=metric`);

      // Extract only the first forecast of each day
      const filteredData = response.data.list.filter((_, index) => index % 8 === 0);

      // Format the data
      const formattedData = filteredData.map(item => ({
        city: city,
        country: response.data.city.country,
        sea_level: item.main.sea_level,
        grnd_level: item.main.grnd_level,
        date: item.dt_txt,
        temperature: item.main.temp,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weatherDescription: item.weather[0].description,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind.speed,
        icon: item.weather[0].icon,
      }));

      weatherDetails(formattedData);
      setHistory({
        city: city,
        country: response.data.city.country,
        date: formattedData[0].date,
        temperature: formattedData[0].temperature,
        weatherDescription: formattedData[0].weatherDescription,
      });
      setCity('');
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name.');
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    findCity();
  }, []);

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={findCity} disabled={loading} className='search-button'>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <div onClick={toggleTheme} className="theme-container">
          {theme === 'light' ? (
            <img src={moon} alt="sun" className="theme-icon" />
          ) : (
            <img src={day} alt="moon" className="theme-icon" />
          )}
        </div>
      </div>
      <div className="error-container">
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Search;

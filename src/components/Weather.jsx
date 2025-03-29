import React, { useContext, useState } from 'react'
import { ThemeContext } from '../store/ThemeContext'
import '../styles/Weather.css'
import wind from "../assets/wind.svg";
import humidity from "../assets/humidity.svg";
import Loading from './Loading';
import History from './History';

const Weather = () => {
  const { dailyData, theme, loading, recHistbtn, setRecHistBtn } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);

  function converttodate(d){
    const dt = new Date(d);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
  }
  function weekday(d){
    const dt = new Date(d);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[dt.getDay()]}`;
  }

  return (
    <>
      {loading && <Loading />}
      {recHistbtn && <History />}
      {(dailyData !== undefined && !loading) && <div className="weather-main-container-all">
        <div className='weather-main-container'>

          <div className={`weather-detail-container ${theme === 'dark' ? 'weather-detail-container-dark' : 'weather-detail-container-light'}`}>
            <div className="weather-detail">
              <div className="weather-detail-left">
                <img src = {`https://openweathermap.org/img/wn/${dailyData[index].icon}.png`} style={{height: '150px', width: 'auto', margin: '-20px'}}/>
                <p style={{padding: '0px', margin: '0px'}}>{dailyData[index].weatherDescription}</p>
              </div>
              <div className="weather-detail-right">
                <h1>{Math.ceil(dailyData[index].temperature)}°C</h1>
                <p>{converttodate(dailyData[index].date)}</p>
                <p>{dailyData[index].city.charAt(0).toUpperCase() + dailyData[index].city.slice(1).toLowerCase()}, {dailyData[index].country}</p>
              </div>
            </div>
            <div className="min-max-temp">
              <div>
                <b>{Math.floor(dailyData[index].temp_min)}°C</b>
                <p>Min</p>
              </div>
              <div>
                <b>{Math.ceil(dailyData[index].temp_max)}°C</b>
                <p>Max</p>
              </div>
            </div>
            <div className={`weather-detail-bottom ${theme === 'dark' ? 'weather-detail-bottom-dark' : 'weather-detail-bottom-light'}`}>
              {dailyData.map((data, i) => (
                <div key={i} className={`weather-detail-bottom-item ${index === i ? 'active' : ''}`} onClick={() => setIndex(i)}>
                  <p>{weekday(data.date)}</p>
                  <img src = {`https://openweathermap.org/img/wn/${data.icon}.png`} style={{height: '50px', width: 'auto'}}/>
                  <p>{Math.ceil(data.temperature)}°C</p>
                </div>
              ))}
            </div>
          </div>  

        </div>
        <div className="weather-main-container-right">

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <p style={{color: 'white'}}>Find your search history here</p>
            <button className={`history-button ${theme === 'dark' ? 'history-button-dark' : 'history-button-light'}`} onClick={() => setRecHistBtn(!recHistbtn)}>History</button>
          </div>
          <div className='weather-extra-detail-container'>
              <div className={`weather-extra-detail ${theme === 'dark' ? 'weather-extra-detail-container-dark' : 'weather-extra-detail-container-light'}`}>

                <b>Wind Speed</b>
                <div className='weather-extra-detail-item'>
                  <img src={wind} alt="wind" className="weather-icon" />
                  <p>{Math.ceil(dailyData[index].windSpeed)} kmph</p>
                </div>
              </div>
              <div className={`weather-extra-detail ${theme === 'dark' ? 'weather-extra-detail-container-dark' : 'weather-extra-detail-container-light'}`}>

                <b>Humidity</b>
                <div className='weather-extra-detail-item'>
                  <img src={humidity} alt="humidity" className="weather-icon" />
                  <p>{dailyData[index].humidity}%</p>
                </div>
              </div>
          </div>
          <div className='weather-extra-detail-container'>
              <div className={`weather-extra-detail ${theme === 'dark' ? 'weather-extra-detail-container-dark' : 'weather-extra-detail-container-light'}`}>

                <b>Pressure</b>
                <div className='weather-extra-detail-item'>
                  <img src="/pressure.png" alt="pressure" className="weather-icon" />
                  <p>{Math.ceil(dailyData[index].pressure)}mb</p>
                </div>
              </div>
              <div className={`weather-extra-detail ${theme === 'dark' ? 'weather-extra-detail-container-dark' : 'weather-extra-detail-container-light'}`}>

                <b>Ground level</b>
                <div className='weather-extra-detail-item'>
                  <img src="/groundlevel.png" alt="ground_level" className="weather-icon" />
                  <p>{dailyData[index].grnd_level}ASL</p>
                </div>
              </div>
          </div>
        </div>
      </div>}
      <div className='footer'>
        Thanks for visiting
      </div>
    </>
  )
}

export default Weather

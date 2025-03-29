import React from 'react'
import '../styles/History.css'
import {MdCancel} from 'react-icons/md'
import { useContext } from 'react'
import { ThemeContext } from '../store/ThemeContext'
const History = () => {
  function converttodate(d){
    const dt = new Date(d);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[dt.getDay()]}, ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
  }

  const { recHistbtn, setRecHistBtn, list } = useContext(ThemeContext);
  return (
    <>
      <div className='history-container'>
        <div className='history-content-container'>
          <div className="cancelIcon" onClick={() => setRecHistBtn(!recHistbtn)}> <MdCancel className="cancelIcon" color="#260750" size="1.5rem"/> </div>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Date</th>
                <th>Temperature</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
              {list.map((data, index) => (
                <tr key={index}>
                  <td>{data.city}, {data.country}</td>
                  <td>{converttodate(data.date)}</td>
                  <td>{Math.ceil(data.temperature)}°C</td>
                  <td>{data.weatherDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default History
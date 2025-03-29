import React, { createContext, useState } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// Create a provider component


export const ThemeProvider = ({ children }) => {
  const [dailyData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [recHistbtn, setRecHist] = useState(false);
  function setRecHistBtn(opp){
    setRecHist(opp);
  }
  function setHistory(history) {
    if (!history) return;

    setList((prevList) => {
      const updatedHistory = [history, ...prevList.filter(item => item.city !== history.city)];

      // Keep only the last 5 searches
      return updatedHistory.slice(0, 5);
    });
  }

  function setLoader(dt){
    setLoading(dt);
  }
  function weatherDetails(data2){
    setWeatherData(data2);
    console.log(data2);
  }
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, weatherDetails, dailyData, loading, setLoader, list, setHistory, recHistbtn, setRecHistBtn }}>
      {children}
    </ThemeContext.Provider>
  );
};
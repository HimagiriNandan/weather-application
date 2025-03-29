import React from 'react'
import Search from '../components/Search'
import { useContext } from 'react'
import { ThemeContext } from '../store/ThemeContext'
import '../styles/Home.css'
import Weather from '../components/Weather'
const Home = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <div className={theme === 'light' ? 'light' : 'dark'} style={{padding: '2%'}}>
      <Search />
      <Weather />
    </div>
  )
}

export default Home

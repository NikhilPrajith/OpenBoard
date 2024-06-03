import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Weather.module.css';
import { MdOutlineDragHandle } from "react-icons/md";

const Weather = ({data}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [city, setCity] = useState('California' || data.city); // Default city
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
        const query = location.lat && location.lon ? `${location.lat},${location.lon}` : city;
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3`
        );
        setWeatherData(response.data);
        data.city = city;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location, city]);


  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCity(e.target.value);
      data.city = e.target.value
      setLocation({ lat: null, lon: null }); // Reset location to use city query
    }
  };

  const getBackgroundImage = (weather) => {
    switch (weather) {
      case 'Sunny':
      case 'Clear':
        return 'url(https://images.unsplash.com/photo-1705847470673-e8dda03b502f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsZWFyJTIwZGF5fGVufDB8fDB8fHww)';
      case 'Cloudy':
      case 'Partly cloudy':
        return 'url(https://images.unsplash.com/photo-1613508788423-c15176f2f964?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
      case 'Rain':
      case 'Rainy':
        return 'url(https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFpbnklMjBkYXl8ZW58MHx8MHx8fDA%3D)';
      case 'Snow':
      case 'Snowy':
        return 'url(https://images.unsplash.com/photo-1547282001-7a9900635cdf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNub3d5JTIwZGF5fGVufDB8fDB8fHww)';
      case 'Thunderstorm':
        return 'url(https://images.unsplash.com/photo-1613820070607-ef1d3ccc07f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fHww)';
      default:
        return 'url(https://plus.unsplash.com/premium_photo-1706625638472-21899066aab2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2lsZW50JTIwZGF5fGVufDB8fDB8fHww)';
    }
  };

  return (
    <>
    <div className={styles.nodeDrag}><MdOutlineDragHandle></MdOutlineDragHandle></div>
    <div
      className={styles.weatherContainer}
      onMouseEnter={() => setIsEditing(true)}
      onMouseLeave={() => setIsEditing(false)}
      style={{
        backgroundImage: weatherData ? getBackgroundImage(weatherData.current.condition.text) : 'url(https://images.unsplash.com/photo-1501973801540-537f08ccae7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjY4OXwwfDF8c2VhcmNofDJ8fGNsb3VkeXxlbnwwfHx8fDE2NzUyMDEzNjI&ixlib=rb-1.2.1&q=80&w=1080)',
      }}
    >
      {isEditing &&<div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter location"
          onKeyPress={handleSearch}
          className={styles.searchBar}
        />
      </div> }
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2>{weatherData.location.name}, {weatherData.location.region}</h2>
          <div className={styles.currentWeather}>
            <p>{weatherData.current.condition.text}</p>
            <p>{Math.round(weatherData.current.temp_c)}°C</p>
            <img
                className={styles.mainIcon}
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
          </div>
          <div className={styles.forecastWeather}>
            {weatherData.forecast.forecastday.map((day, index) => (
              <div key={index} className={styles.forecastDay}>
                <p>{new Date(day.date).toLocaleDateString()}</p>
                <p>{day.day.condition.text}</p>
                <p className={styles.maxTemp}>Max: {Math.round(day.day.maxtemp_c)}°C</p>
                <p className={styles.minTemp}>Min: {Math.round(day.day.mintemp_c)}°C</p>
                <img
                    className={styles.icon}
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Weather;

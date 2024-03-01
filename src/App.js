import React, { useState, useEffect } from 'react';
import './App.css';

const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [messageAnimation, setMessageAnimation] = useState(false);

  useEffect(() => {
    const getWeatherByLocation = async () => {
      try {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`);
          const result = await response.json();
          setWeather(result);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error getting weather by location:', error);
        setLoading(false);
      }
    };

    getWeatherByLocation();
  }, []);

  const search = (evt) => {
    if (evt.key === "Enter") {
      getResults(query);
    }
  };

  const getResults = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
      const result = await response.json();
      setWeather(result);
      setLoading(false);
      setQuery('');
    } catch (error) {
      console.error('Error getting weather by query:', error);
      setLoading(false);
    }
  };

  const renderWeatherContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!weather.name) {
      return <div>Unable to fetch weather data. Please try again.</div>;
    }

    const randomMessage = getRandomMessage(weather.weather?.[0]?.id);

    return (
      <div>
        <section className="location">
          <div className="city">{`${weather.name}, ${weather.sys?.country || ''}`}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </section>

        <div className="current">
          <div className="temp">{`${Math.round(weather.main?.temp) || ''}°C`}</div>
          <div className="weather">{weather.weather?.[0]?.main || ''}</div>
          <div className="wind">Wind: {`${weather.wind?.speed || ''} m/s`}</div>
          <div className="hi-low">↑ {`${weather.main?.temp_min || ''}°C / ↓ ${weather.main?.temp_max || ''}°C`}</div>
        </div>

        <div className={`message ${messageAnimation ? 'animated' : ''}`} onAnimationEnd={() => setMessageAnimation(false)}>
          {randomMessage}
        </div>
      </div>
    );
  };

  const dateBuilder = (d) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getDayOfWeek = (index) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();
    return daysOfWeek[(today + index) % 7];
  };

  const getRandomMessage = (weatherCode) => {
    const messages = {
      200: "Thunderstorm approaching! Stay safe.",
      300: "Drizzle, grab an umbrella!",
      500: "Rainy days are cozy days.",
      600: "Snowy day! Perfect for hot chocolate.",
      700: "Foggy weather, drive carefully.",
      800: "Clear skies, enjoy the sunshine!",
      801: "Partly cloudy – a nice day ahead.",
      802: "Cloudy day, perfect for a movie!",
      803: "Mostly cloudy, but it's not raining!",
      804: "Overcast skies. Keep cozy indoors.",
    };

    const defaultMessage = "Weather is unpredictable!";

    return messages[weatherCode] || defaultMessage;
  };

  useEffect(() => {
    setMessageAnimation(true);
  }, [weather.weather?.[0]?.id]);
  
  useEffect(() => {
    const setSeasonalBackground = () => {
      //document.body.style.backgroundColor = '#78a4c7';

      const currentMonth = new Date().getMonth() + 1; // Adding 1 to get 1-based index
const springStart = 3; // March
const summerStart = 6; // June
const autumnStart = 9; // September
const winterStart = 12; // December
  
      let backgroundURL = '';
      
      /*if (currentMonth >= springStart && currentMonth < summerStart) {
        backgroundURL = 'url("./Resources/spriing.jpg")'; // Replace with your spring background image
      } else if (currentMonth >= summerStart && currentMonth < autumnStart) {
        backgroundURL = 'url("./Resources/summer.jpg")'; // Replace with your summer background image
      } else if (currentMonth >= autumnStart && currentMonth < winterStart) {
        backgroundURL = 'url("./Resources/Autumn.jpg")'; // Replace with your autumn background image
      } else {
        backgroundURL = 'url("./Resources/Winter.jpg")'; // Replace with your winter background image
      }*/
      
      document.body.style.backgroundImage = backgroundURL;
    };
  
    setSeasonalBackground();
  }, [weather.weather?.[0]?.id]);
  

  return (
    <div className="app-wrap">
      <header>
        <input
          type="text"
          autoComplete="off"
          className="search-box"
          placeholder="Search for a city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </header>

      <main>
        {renderWeatherContent()}
      </main>
    </div>
  );

}

export default App;

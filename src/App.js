import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Booking from './Booking';
import QRCodeComponent from './QRCodeComponent'; // Import the QRCodeComponent

function App() {
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState(new Date());

  
  useEffect(() => {
    // In the case that I need to update they key, I made it a variable
    const apiKey = 'afe76ddbc763b4505e57d0517507e4a7';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=59.2170&lon=17.9740&appid=${apiKey}&units=metric`;

    axios.get(weatherApiUrl)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Bonds Infoskärm</h1>
      <img src="/bond-image.jpg" alt="Bond" />
      <div>
        <p>Namn: Bondhon Shahriar Alam</p>
        <p>Titel: Biträdande Rektor</p>
        <p>Telefon: 076-108 78 89</p>
        <p>Kontaktuppgifter: Lägg kontakt uppgifterna här</p>
      </div>
      <div>
        <p>Aktuellt väder: {weather.main?.temp}°C, {weather.weather?.[0]?.description}</p>
      </div>
      <div>
        <p>Aktuellt datum: {date.toLocaleDateString()}</p>
        <p>Aktuellt veckonummer: {getWeekNumber(date)}</p>
      </div>
      {/* Svårt att veta vad du vill att QRkoden ska vara. Jag la min egna ip adress och det fungerade, så du kommer behöva ändra till din egna tror jag. */}
      <QRCodeComponent url="http://192.168.0.95:3000/booking" /> 
    </div>
  );
}


function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(d);
  d.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  // Get first day of year
  const yearStart = new Date(d.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
}

export default App;

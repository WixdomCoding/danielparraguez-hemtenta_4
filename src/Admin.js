import React, { useState, useEffect } from 'react';
import axios from 'axios';

// OBS!! username och password är båda 'admin' ifall att du inte har ändrat på den på line 12 :)

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [newTime, setNewTime] = useState('');

  const handleLogin = () => {
    // Set username and password
    if (username === 'admin' && password === 'admin') {
      // Set isLoggedIn to true if login is successful
      setIsLoggedIn(true);

      // Store login status in local storage
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  const handleLogout = () => {
    // Set isLoggedIn to false
    setIsLoggedIn(false);

    // Remove login status from local storage
    localStorage.removeItem('isLoggedIn');
  };

  const checkLoginStatus = () => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      // If logged in, set isLoggedIn to true
      setIsLoggedIn(true);
    }
  };

  const addAvailableTime = async () => {
    if (newTime.trim() === '') {
      alert('Please enter a valid time.');
      return;
    }

    try {
      // Send a POST request to the server to add the new time to the "times" table
      await axios.post('/api/add-available-time', { time: newTime });
      setNewTime('');
    } catch (error) {
      console.error('Error adding available time:', error);
    }
  };

  useState(() => {
    checkLoginStatus();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, Admin! (Logout button at bottom)</h1>
          <div>
            <h1>Admin Page - Add Available Times</h1>
            <div>
                {/* Input field for new available time */}
                <input
                type="text"
                placeholder="Enter new available time (e.g., 12:30)"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                />

                {/* Button to add the new available time */}
                <button onClick={addAvailableTime}>Add Time</button>
            </div>

            {/* Display the list of available times */}
            <div>
                <h2>Available Times:</h2>
                <ul>
                {availableTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                ))}
                </ul>
            </div>
        </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {/* Input fields for username and password */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login button */}
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Admin;

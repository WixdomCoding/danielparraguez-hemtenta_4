import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Finish = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: window.history.state.usr.date,
        selectedTime: '',
    });
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
    const fetchAvailableTimes = async () => {
        try {
        const response = await axios.get('/api/available-times');
        setAvailableTimes(response.data);
        } catch (error) {
        console.error('Error fetching available times:', error);
        }
    };

    fetchAvailableTimes();
    }, []);

    console.log(window.history.state)

    console.log(formData)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/booking/finish', formData);
      };


  return (
    (
        <div>
          <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="firstName">Name</label>
            <input type="text" name="firstName" id="firstName" onChange={handleChange} />
            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" id="lastName" onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={handleChange} />
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" onChange={handleChange} />
    
            {/* New dropdown for available times */}
            <label htmlFor="selectedTime">Select Time</label>
            <select
              name="selectedTime"
              id="selectedTime"
              value={formData.selectedTime}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select an available time
              </option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
    
            <input type="submit" value="Book Time" />
          </form>
        </div>
  )
  )
              }

export default Finish

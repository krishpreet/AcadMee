import React, { useState } from 'react';
import { DatePicker } from '@gsebdev/react-simple-datepicker';
import './styles.css';
import axios from 'axios';

function Calendar({ data, closePopup }) {
  const [selectedDate, setSelectedDate] = useState('01/02/2023');

  const onChangeCallback = ({ target }) => {
    setSelectedDate(target.value);
    // Additional logic or actions to perform when the date is selected
    console.log('Selected date:', target.value);
  };

  const submitDate = () => {
    axios
      .post('/save-date', { selectedDate })
      .then(response => {
        console.log(response.data.message);
        // Additional logic or actions after the date is saved
        closePopup(); // Close the popup
      })
      .catch(error => {
        console.error('Error saving date:', error);
        // Handle error case
      });
  };

  return (
    <div className="container calendarPopup">
      <h2>Book a slot</h2>
      <DatePicker
        id="datepicker-id"
        name="date-demo"
        onChange={onChangeCallback}
        value={selectedDate}
      />
      <button onClick={submitDate}>Submit</button>
    </div>
  );
}

export default Calendar;

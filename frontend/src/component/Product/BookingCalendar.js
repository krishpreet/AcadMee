import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./BookingCalendar.css";
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, addMonths, subMonths, isSameMonth } from "date-fns";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { product } = useSelector((state) => state.productDetails);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(currentMonthStart);

    const days = [];
    let day = startDate;

    while (day <= currentMonthEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePreviousMonth}>&lt;</button>
          <div className="currentMonthYear">
            {format(currentMonthStart, "MMMM yyyy")}
          </div>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="week-days">
          {weekDays.map((day) => (
            <div key={day} className="week-day">
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`day ${isSameMonth(day, today) ? "currentMonth" : "otherMonth"} ${
                isSameMonth(day, selectedDate) ? "selected" : ""
              } ${day < today ? "disabled" : ""}`}
              onClick={() => day >= today && handleDateClick(day)}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="calendarheaderbooking">
      <h2>Book a trial class with {product.name}</h2>
      {renderCalendar()}
      {selectedDate && <p>Selected date: {format(selectedDate, "dd MMM yyyy")}</p>}
    </div>
  );
};

export default BookingCalendar;

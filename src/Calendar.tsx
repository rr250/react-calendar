import { MouseEventHandler } from 'react';
import './Calendar.css';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};

function Calendar({ date, onChange }: Props) {
  // get the year and month of the date prop
  const year = date.getFullYear();
  const month = date.getMonth();

  // get the first and last day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // get the number of days in the month and the starting day of the week
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  // get the names of the months and days
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // create an array of dates to display in the calendar
  const dates: (number | null)[] = [];
  let dateNum = 1;

  // fill the empty cells before the start day with null values
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }

  // fill the cells with the dates of the month
  for (let i = startDay; i < startDay + daysInMonth; i++) {
    dates.push(dateNum);
    dateNum++;
  }

  // fill the empty cells after the last day with null values
  for (let i = startDay + daysInMonth; i < 42; i++) {
    dates.push(null);
  }

  // create a function to handle date selection
  const handleSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    const day = target.textContent;
    if (day) {
      // create a new date object with the selected day
      const selectedDate = new Date(year, month, Number(day));
      // call the onChange prop with the selected date
      onChange(selectedDate);
    }
  };

   // create a function to handle month change
   const handleMonthChange: MouseEventHandler<HTMLButtonElement> = (event) => {
     const target = event.target as HTMLButtonElement;
     const direction = target.dataset.direction;
     if (direction === "prev") {
       // subtract one month from the current date
       onChange(new Date(year, month -1, date.getDate()));
     } else if (direction === "next") {
       // add one month to the current date
       onChange(new Date(year, month +1, date.getDate()));
     }
   };

   // create a function to handle year change
   const handleYearChange: MouseEventHandler<HTMLButtonElement> = (event) => {
     const target = event.target as HTMLButtonElement;
     const direction = target.dataset.direction;
     if (direction === "prev") {
       // subtract one year from the current date
       onChange(new Date(year -1, month, date.getDate()));
     } else if (direction === "next") {
       // add one year to the current date
       onChange(new Date(year +1, month, date.getDate()));
     }
   };



  return (
    <div className='calendar'>
      {/* render the month and year and render buttons for changing them*/}
      <div className='calendar-buttons'>
        <div>
          <button data-direction="prev" onClick={handleYearChange}>&lt;&lt;</button>
          <button data-direction="prev" onClick={handleMonthChange}>&lt;</button>
        </div>
        {monthNames[month]} {year}
        <div>
          <button data-direction="next" onClick={handleMonthChange}>&gt;</button>
          <button data-direction="next" onClick={handleYearChange}>&gt;&gt;</button>
        </div>
      </div>
      {/* render the days of the week */}
      <div className='calendar-grid'>
        {dayNames.map((day) => (
          <div key={day} className='calendar-cell calendar-day'>
            {day}
          </div>
        ))}
        {/* render the dates of the month */}
        {dates.map((day, index) => (
          <div
            key={index}
            className={`calendar-cell calendar-date ${
              day === date.getDate() ? 'calendar-selected' : ''
            }`}
            onClick={handleSelect}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
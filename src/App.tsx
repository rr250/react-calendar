import { useState } from 'react';
import Calendar from './Calendar';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
      <h1 className='text-center'>React Calendar</h1>
      <div className='calendar-container'>
        <Calendar date={date} onChange={setDate} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span> {date.toDateString()}
      </p>
    </div>
  );
}

export default App;
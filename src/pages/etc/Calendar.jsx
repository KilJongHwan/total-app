import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일

const MyCalendar = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const onChangeDateRange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <div>
      <div>
        <label>시작일:</label>
        <Calendar
          onChange={onChangeDateRange}
          value={dateRange}
          selectRange={true}
        />
        <p>선택된 시작일: {dateRange[0].toDateString()}</p>
      </div>
      <div>
        <label>종료일:</label>
        <p>선택된 종료일: {dateRange[1].toDateString()}</p>
      </div>
    </div>
  );
};

export default MyCalendar;

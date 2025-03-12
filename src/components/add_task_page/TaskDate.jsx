import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function TaskDate({ handleChange }) {
  // const [date, setDate] = useState();

  // console.log(date);

  return (
    <div>
      <p>დედლაინი</p>
      <input
        type="date"
        className="w-[320px] h-[45px] p-[14px] text-[#ADB5BD] border border-[#CED4DA] bg-white rounded-md focus:outline-none"
        onChange={(e) => handleChange("due_date", e.target.value)}
      />
      {/* <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        className="p-2 border rounded w-full"
        placeholderText="Select a date"
      /> */}
    </div>
  );
}

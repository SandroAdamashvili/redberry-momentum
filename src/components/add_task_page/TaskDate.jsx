import { useRef } from "react";
import Calendar from "../../assets/calendar.svg";

export default function TaskDate({ handleChange, dateValue }) {
  const dateRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const date = new Date(dateValue).toLocaleDateString("en-GB");

  return (
    <div className="relative w-[320px]">
      <p>დედლაინი*</p>
      <div
        className="w-full h-[45px] px-[14px] py-[12.5px] flex flex-row items-center gap-1.5 text-[#ADB5BD] font-light border border-[#CED4DA] bg-white rounded-md focus:outline-none hover:cursor-pointer"
        onClick={() => dateRef.current.showPicker()}
      >
        <img src={Calendar} alt="calendar icon" className="w-[16px] h-[16px]" />
        <p>{dateValue ? `${date}` : ""}</p>
      </div>
      <input
        type="date"
        ref={dateRef}
        className="absolute top-0 left-0 w-full h-full invisible"
        onChange={(e) => handleChange("due_date", e.target.value)}
        min={today}
        defaultValue={dateValue}
      />
    </div>
  );
}

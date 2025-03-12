import { useRef } from "react";

export default function ModalInput({ title, inputName, onChange, inputValue }) {
  const inputRef = useRef();

  return (
    <div className="w-full flex flex-col">
      <p>{title}</p>
      <input
        type="text"
        ref={inputRef}
        className="w-full h-[42px] border border-[#CED4DA] rounded-[6px] p-[10px] focus:outline-none mb-2"
        onChange={() => onChange(inputName, inputRef.current.value)}
        value={inputValue}
      />
      <p className="text-xs font-light text-[#6C757D]">მინიმუმ 2 სიმბოლო</p>
      <p className="text-xs font-light text-[#6C757D]">მაქსიმუმ 255 სიმბოლო</p>
      {/* <p className="text-xs font-light text-[#6C757D]">
        მარტო ლათინური და ქართული ასოები
      </p> */}
    </div>
  );
}

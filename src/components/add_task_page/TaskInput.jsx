import { useRef } from "react";

export default function TaskInput({
  type,
  title,
  inputName,
  onChange,
  inputValue,
}) {
  const inputRef = useRef();

  return (
    <div className="w-[550px] flex flex-col">
      <p>{title}</p>
      {type === "text" ? (
        <input
          ref={inputRef}
          type="text"
          className="w-[550px] h-[45px] border border-[#CED4DA] bg-white rounded-[6px] p-[10px] focus:outline-none mb-2"
          onChange={() => onChange(inputName, inputRef.current.value)}
          value={inputValue}
        />
      ) : (
        <textarea
          ref={inputRef}
          className="w-[550px] h-[133px] border border-[#CED4DA] bg-white rounded-[6px] p-[10px] focus:outline-none mb-2"
          onChange={() => onChange(inputName, inputRef.current.value)}
          value={inputValue}
        ></textarea>
      )}
      <p className="text-xs font-light text-[#6C757D]">მინიმუმ 2 სიმბოლო</p>
      <p className="text-xs font-light text-[#6C757D]">მაქსიმუმ 255 სიმბოლო</p>
    </div>
  );
}

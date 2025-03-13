import { useRef, useState } from "react";

export default function TaskInput({
  type,
  title,
  inputName,
  onChange,
  inputValue,
  handleValidation,
}) {
  const [minTwoSymbols, setMinTwoSymbols] = useState(null);
  const [maxSymbols, setMaxSymbols] = useState(null);

  function handleChange(e) {
    const value = e.target.value;
    onChange(inputName, value);

    const isMinValid = value.length >= 2;
    const isMaxValid = value.length <= 255;

    setMinTwoSymbols(isMinValid);
    setMaxSymbols(isMaxValid);

    handleValidation(inputName, !(isMinValid && isMaxValid));
  }

  return (
    <div className="w-[550px] flex flex-col">
      <p>{title}</p>
      {type === "text" ? (
        <input
          type="text"
          className={`w-[550px] h-[45px] border ${
            minTwoSymbols === false || maxSymbols === false
              ? "border-[#FA4D4D]"
              : "border-[#CED4DA]"
          } bg-white rounded-[6px] p-[10px] focus:outline-none mb-2`}
          onChange={handleChange}
          value={inputValue}
        />
      ) : (
        <textarea
          className="w-[550px] h-[133px] border border-[#CED4DA] bg-white rounded-[6px] p-[10px] focus:outline-none mb-2"
          onChange={handleChange}
          value={inputValue}
        ></textarea>
      )}
      <p
        className={`text-xs font-light ${
          minTwoSymbols == null
            ? "text-[#6C757D]"
            : minTwoSymbols
            ? "text-[#08A508]"
            : "text-[#FA4D4D]"
        }`}
      >
        მინიმუმ 2 სიმბოლო
      </p>
      <p
        className={`text-xs font-light ${
          maxSymbols == null
            ? "text-[#6C757D]"
            : maxSymbols
            ? "text-[#08A508]"
            : "text-[#FA4D4D]"
        }`}
      >
        მაქსიმუმ 255 სიმბოლო
      </p>
    </div>
  );
}

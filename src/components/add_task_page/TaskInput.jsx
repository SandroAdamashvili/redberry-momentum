import { useState } from "react";

export default function TaskInput({
  type,
  title,
  inputName,
  onChange,
  inputValue,
  handleValidation,
  validation,
}) {
  const [minSymbols, setMinSymbols] = useState(
    localStorage.getItem(`${inputName}Min`)
      ? JSON.parse(localStorage.getItem(`${inputName}Min`))
      : null
  );
  const [maxSymbols, setMaxSymbols] = useState(
    localStorage.getItem(`${inputName}Max`)
      ? JSON.parse(localStorage.getItem(`${inputName}Max`))
      : null
  );

  function handleChange(e) {
    const value = e.target.value;
    onChange(inputName, value);

    const isMinValid =
      type === "text"
        ? value.trim().length >= 3
        : value.trim().length >= 4 || value.length === 0;
    const isMaxValid = value.trim().length <= 255;

    setMinSymbols(isMinValid);
    setMaxSymbols(isMaxValid);

    localStorage.setItem(`${inputName}Min`, isMinValid);
    localStorage.setItem(`${inputName}Max`, isMaxValid);

    if (inputName === "description" && value.length === 0) {
      localStorage.removeItem(`${inputName}Min`);
      localStorage.removeItem(`${inputName}Max`);
      setMinSymbols(null);
      setMaxSymbols(null);
    }

    handleValidation(inputName, !(isMinValid && isMaxValid));
  }

  return (
    <div className="w-[550px] flex flex-col">
      <p>{title}</p>
      {type === "text" ? (
        <input
          type="text"
          className={`w-[550px] h-[45px] border ${
            minSymbols === false || maxSymbols === false || validation
              ? "border-[#FA4D4D]"
              : "border-[#CED4DA]"
          } bg-white rounded-[6px] p-[10px] focus:outline-none mb-2`}
          onChange={handleChange}
          value={inputValue}
        />
      ) : (
        <textarea
          className={`w-[550px] h-[133px] border ${
            minSymbols === false || maxSymbols === false || validation
              ? "border-[#FA4D4D]"
              : "border-[#CED4DA]"
          } bg-white rounded-[6px] p-[10px] focus:outline-none mb-2 resize-none`}
          onChange={handleChange}
          value={inputValue}
        ></textarea>
      )}
      <p
        className={`text-xs font-light ${
          minSymbols == null
            ? "text-[#6C757D]"
            : minSymbols
            ? "text-[#08A508]"
            : "text-[#FA4D4D]"
        }`}
      >
        {type === "text" ? "მინიმუმ 3 სიმბოლო" : "მინიმუმ 4 სიმბოლო"}
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

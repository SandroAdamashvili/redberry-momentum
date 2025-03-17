import { useEffect, useState } from "react";

export default function ModalInput({
  title,
  inputName,
  onChange,
  inputValue,
  handleValidation,
  validation,
  open,
}) {
  const [minSymbols, setMinSymbols] = useState(null);
  const [maxSymbols, setMaxSymbols] = useState(null);
  const [onlyLetters, setOnlyLetters] = useState(null);

  useEffect(() => {
    setMinSymbols(null);
    setMaxSymbols(null);
    setOnlyLetters(null);
  }, [open]);

  function handleChange(e) {
    const value = e.target.value;
    onChange(inputName, value);

    const isMinValid = value.trim().length >= 2 && !value.startsWith(" ");
    const isMaxValid = value.trim().length <= 255;
    const isOnlyLetters = /^[a-zA-Zა-ჰ\s]+$/.test(value);
    setMinSymbols(isMinValid);
    setMaxSymbols(isMaxValid);
    setOnlyLetters(isOnlyLetters);

    handleValidation(inputName, !(isMinValid && isMaxValid && isOnlyLetters));
  }

  return (
    <div className="w-full flex flex-col">
      <p>{title}</p>
      <input
        type="text"
        className={`w-full h-[42px] border rounded-[6px] p-[10px] focus:outline-none mb-2`}
        onChange={(e) => handleChange(e)}
        value={inputValue}
        style={{
          borderColor: validation ? "#FA4D4D" : "#CED4DA",
        }}
      />
      <p
        className={`text-xs font-light ${
          (!validation && !minSymbols) ||
          (!validation && inputValue.length === 0)
            ? "text-[#6C757D]"
            : minSymbols || !validation
            ? "text-[#08A508]"
            : "text-[#FA4D4D]"
        }`}
      >
        მინიმუმ 2 სიმბოლო
      </p>
      <p
        className={`text-xs font-light ${
          (!validation && !maxSymbols) ||
          (!validation && inputValue.length === 0)
            ? "text-[#6C757D]"
            : maxSymbols || !validation
            ? "text-[#08A508]"
            : "text-[#FA4D4D]"
        }`}
      >
        მაქსიმუმ 255 სიმბოლო
      </p>
      <p
        className={`text-xs font-light ${
          (!validation && !onlyLetters) ||
          (!validation && inputValue.length === 0)
            ? "text-[#6C757D]"
            : onlyLetters || !validation
            ? "text-[#08A508]"
            : "text-[#FA4D4D]"
        }`}
      >
        მარტო ლათინური და ქართული ასოები
      </p>
    </div>
  );
}

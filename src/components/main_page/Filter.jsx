import { useState } from "react";
import ArrDown from "../../assets/arrow-down.svg";

export default function Filter() {
  const [filterOpen, setFilterOpen] = useState(false);

  function handleFilterBox() {
    setFilterOpen(!filterOpen);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center border border-[#DEE2E6] px-[18px] py-[10px] rounded-[10px] gap-[45px] w-[688px] font-normal text-base relative mb-[79px]">
        <div className="flex flex-row gap-2" onClick={handleFilterBox}>
          <p>დეპარტამენტი</p>
          <img src={ArrDown} alt="arrow down icon" />
        </div>
        <div className="flex flex-row gap-2" onClick={handleFilterBox}>
          <p>პრიორიტეტი</p>
          <img src={ArrDown} alt="arrow down icon" />
        </div>
        <div className="flex flex-row gap-2" onClick={handleFilterBox}>
          <p>თანამშრომელი</p>
          <img src={ArrDown} alt="arrow down icon" />
        </div>
        <div
          className={`absolute w-full h-[274px] border-[0.5px] border-[#8338EC] bg-white rounded-[10px] right-0 top-14 ${
            !filterOpen && "hidden"
          }`}
        ></div>
      </div>
    </>
  );
}

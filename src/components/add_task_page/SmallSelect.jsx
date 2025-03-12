import { useState } from "react";
import ArrDown from "../../assets/small-arrow-down.svg";
import ArrUp from "../../assets/arrow-up.svg";
import useGetPriority from "../../hooks/useGetPriority";
import useGetStatus from "../../hooks/useGetStatus";

export default function SmallSelect({ type, title }) {
  const [selectOpen, setSelectOpen] = useState(false);
  const data = type === "status" ? useGetStatus() : useGetPriority();

  console.log(data);

  return (
    <div className="w-full">
      <p>{title}</p>
      <div
        className="w-[259px] h-[46px] px-[14px] flex flex-row items-center justify-between border border-[#CED4DA] bg-white rounded-md relative hover:cursor-pointer"
        onClick={() => setSelectOpen(!selectOpen)}
      >
        <p></p>
        <img src={selectOpen ? ArrUp : ArrDown} alt="arrow" />
        {selectOpen && (
          <ol className="absolute w-[259px] max-h-[230px] border-b border-r border-l border-[#CED4DA] bg-white top-[36px] right-0 left-[-1px] flex flex-col gap-[11px] z-30 overflow-y-auto">
            {data.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex flex-row gap-[6px] items-center font-light text-sm py-3 px-3.5 hover:cursor-pointer"
                  //   onClick={() => handleChange("department_id", employee.id)}
                >
                  {type === "priority" && (
                    <img
                      className="rounded-[100px]"
                      src={item.icon}
                      alt="icon"
                    />
                  )}
                  {item.name}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

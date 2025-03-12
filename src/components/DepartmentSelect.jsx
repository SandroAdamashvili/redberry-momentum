import { useState } from "react";
import ArrDown from "../assets/small-arrow-down.svg";
import ArrUp from "../assets/arrow-up.svg";
import useGetDeps from "../hooks/useGetDeps";

export default function DepartmentSelect({ depValue, handleChange, type }) {
  const [depsOpen, setDepsOpen] = useState(false);
  const depsData = useGetDeps();

  return (
    <div className="w-full">
      <p>დეპარტამენტი*</p>
      <div
        className={`${
          type === "taskDeps" ? "w-[550px] h-[45px]" : "w-[384px] h-[42px]"
        } px-[14px] flex flex-row items-center justify-between border border-[#CED4DA] bg-white rounded-md relative hover:cursor-pointer`}
        onClick={() => setDepsOpen(!depsOpen)}
      >
        <p className="text-sm">{depValue && depsData[depValue - 1].name}</p>
        <img src={depsOpen ? ArrUp : ArrDown} alt="arrow" />
        {depsOpen && (
          <ol
            className={`absolute ${
              type === "taskDeps"
                ? "w-[550px] max-h-[230px]"
                : "w-[384px] max-h-[100px]"
            } border-b border-r border-l border-[#CED4DA] bg-white top-[36px] right-0 left-[-1px] flex flex-col gap-[11px] z-30 overflow-y-auto`}
          >
            {depsData.map((department) => {
              return (
                <li
                  key={department.id}
                  className="font-light text-sm py-3 px-3.5 hover:cursor-pointer"
                  onClick={() => handleChange("department_id", department.id)}
                >
                  {department.name}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

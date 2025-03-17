import { useState } from "react";
import useGetStatus from "../../hooks/useGetStatus";
import ArrDown from "../../assets/small-arrow-down.svg";
import ArrUp from "../../assets/arrow-up.svg";
import useChangeStatus from "../../hooks/useChangeStatus";

export default function TaskStatusSelect({ selectValue, taskId }) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(selectValue);
  const { data } = useGetStatus();
  const { changeStatus } = useChangeStatus();

  async function handleSelect(status) {
    try {
      await changeStatus(taskId, status);
    } catch (error) {
      console.error("Failed to update status: ", error);
    }
  }

  return (
    <div
      className="w-[259px] h-[45px] px-[14px] flex flex-row items-center justify-between border border-[#CED4DA] bg-white rounded-md relative hover:cursor-pointer"
      onClick={() => setSelectOpen(!selectOpen)}
    >
      <p className="text-sm font-light">{statusValue ?? selectValue}</p>
      <img src={selectOpen ? ArrUp : ArrDown} alt="arrow" />
      {selectOpen && (
        <ol className="absolute w-[259px] max-h-[184px] py-3 border-b border-r border-l border-[#CED4DA] bg-white top-[36px] right-0 left-[-1px] flex flex-col gap-[11px] z-30 overflow-y-auto">
          {data.map((status) => {
            if (status.name !== (statusValue ?? selectValue)) {
              return (
                <li
                  key={status.id}
                  className="font-light text-sm py-3 px-3.5 hover:cursor-pointer"
                  onClick={() => {
                    handleSelect(status.id);
                    setStatusValue(status.name);
                  }}
                >
                  {status.name}
                </li>
              );
            }
          })}
        </ol>
      )}
    </div>
  );
}

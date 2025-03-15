import { useEffect, useState } from "react";
import ArrDown from "../../assets/small-arrow-down.svg";
import ArrUp from "../../assets/arrow-up.svg";
import useGetEmployees from "../../hooks/useGetEmployees";
import AddIcon from "../../assets/add-employee.svg";

export default function EmployeesSelect({
  setModalOpen,
  handleChange,
  empValue,
  dep_id,
  validation,
  handleValidation,
}) {
  const [selectOpen, setSelectOpen] = useState(false);
  const empsData = useGetEmployees() || [];

  const filteredData = empsData?.filter(
    (employee) => employee.department?.id === dep_id
  );
  const selectedEmployee = empsData?.find(
    (employee) => employee.id === empValue
  );

  // console.log(empsData[1]?.name);
  // console.log(empsData);
  console.log(selectedEmployee);
  console.log(dep_id);

  return (
    <div className="w-full">
      <p>პასუხისმგებელი თანამშრომელი*</p>
      <div
        className={`w-[550px] h-[45px] px-[14px] flex flex-row items-center justify-between border ${
          validation ? "border-[#FA4D4D]" : "border-[#CED4DA]"
        } bg-white rounded-md relative hover:cursor-pointer`}
        onClick={() => setSelectOpen(!selectOpen)}
        style={{
          borderColor: validation ? "border-[#FA4D4D]" : "border-[#CED4DA]",
        }}
      >
        <p className="flex flex-row gap-[6px] items-center text-sm">
          {selectedEmployee && dep_id === selectedEmployee.department.id && (
            <>
              <img
                src={selectedEmployee.avatar}
                alt="avatar"
                className="w-[28px] h-[28px] rounded-[100px]"
              />
              {selectedEmployee.name + " " + selectedEmployee.surname}
            </>
          )}
        </p>

        <img src={selectOpen ? ArrUp : ArrDown} alt="arrow" />
        {selectOpen && (
          <ol className="absolute w-[550px] max-h-[230px] border-b border-r border-l border-[#CED4DA] bg-white top-[36px] right-0 left-[-1px] flex flex-col gap-[11px] z-30 overflow-y-auto">
            <li
              className="flex flex-row gap-[6px] items-center font-light text-base text-[#8338EC] py-3 px-3.5 hover:cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <img src={AddIcon} alt="add employee" />
              დაამატე თანამშრომელი
            </li>
            {filteredData.map((employee) => {
              return (
                <li
                  key={employee.id}
                  className="flex flex-row gap-[6px] items-center font-light text-sm py-3 px-3.5 hover:cursor-pointer"
                  onClick={() => {
                    handleChange("employee_id", employee.id);
                    handleValidation("employee_id", false);
                  }}
                >
                  <img
                    className="w-[28px] h-[28px] rounded-[100px]"
                    src={employee.avatar}
                    alt="avatar"
                  />
                  {employee.name + " " + employee.surname}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

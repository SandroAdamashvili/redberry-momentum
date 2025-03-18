import { useState } from "react";
import ArrDown from "../../assets/small-arrow-down.svg";
import ArrUp from "../../assets/arrow-up.svg";
import AddIcon from "../../assets/add-employee.svg";

export default function EmployeesSelect({
  setModalOpen,
  handleChange,
  empValue,
  dep_id,
  validation,
  handleValidation,
  employeesData,
}) {
  const [selectOpen, setSelectOpen] = useState(false);

  const filteredemployeesData = employeesData?.filter(
    (employee) => employee.department?.id === dep_id
  );
  const selectedEmployee = employeesData?.find(
    (employee) => employee.id === empValue
  );

  return (
    <div className="w-full">
      <p className="text-[#ADB5BD]">პასუხისმგებელი თანამშრომელი*</p>
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
          <ol className="absolute w-[550px] max-h-[230px] py-3 border-b border-r border-l border-[#CED4DA] bg-white top-[36px] right-0 left-[-1px] flex flex-col gap-[11px] z-30 overflow-y-auto">
            <li
              className="flex flex-row gap-[6px] items-center font-light text-base text-[#8338EC] py-3 px-3.5 hover:cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <img src={AddIcon} alt="add employee" />
              დაამატე თანამშრომელი
            </li>
            {filteredemployeesData.map((employee) => {
              return (
                empValue !== employee.id && (
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
                )
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

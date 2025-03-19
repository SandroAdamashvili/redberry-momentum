import Header from "../Header";
import { useState } from "react";
import Filter from "./Filter";
import Modal from "../modal/Modal";
import useGetTasks from "../../hooks/useGetTasks";
import useGetEmployees from "../../hooks/useGetEmployees";
import TaskCard from "./TaskCard";
import XIcon from "../../assets/x.svg";

export default function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const data = useGetTasks();
  const { data: employeesData, setData } = useGetEmployees();
  const notStarted = [
    ...data.filter((item) => item.status.name === "დასაწყები"),
  ];
  const inProgress = [
    ...data.filter((item) => item.status.name === "პროგრესში"),
  ];
  const readyForTest = [
    ...data.filter((item) => item.status.name === "მზად ტესტირებისთვის"),
  ];
  const finished = [
    ...data.filter((item) => item.status.name === "დასრულებული"),
  ];
  const [filterOpen, setFilterOpen] = useState({});
  const [employeeSelected, setEmployeeSelected] = useState(
    localStorage.getItem("თანამშრომელი")
      ? JSON.parse(localStorage.getItem("თანამშრომელი"))
      : {}
  );
  const [prioritiesSelected, setPrioritiesSelected] = useState(
    localStorage.getItem("პრიორიტეტი")
      ? JSON.parse(localStorage.getItem("პრიორიტეტი"))
      : []
  );
  const [depsSelected, setDepsSelected] = useState(
    localStorage.getItem("დეპარტამენტი")
      ? JSON.parse(localStorage.getItem("დეპარტამენტი"))
      : []
  );

  function updateEmployees(newData) {
    setData(newData);
  }

  function handleFilterBox(name) {
    setFilterOpen({ [name]: !filterOpen[name] });
  }

  return (
    <>
      <Modal
        open={modalOpen}
        onModalClose={() => setModalOpen(false)}
        updateEmployees={updateEmployees}
        updateRequired={true}
      />
      <Header onModalClick={() => setModalOpen(true)} />
      <h1 className="text-[34px] font-semibold mb-[52px]">
        დავალებების გვერდი
      </h1>
      <div className="flex flex-row justify-between items-center border border-[#DEE2E6] px-[18px] py-[10px] rounded-[10px] gap-[45px] w-[688px] font-normal text-base relative">
        <Filter
          filterOpen={filterOpen["დეპარტამენტი"]}
          filterName="დეპარტამენტი"
          handleFilterBox={handleFilterBox}
          value={depsSelected}
          setValue={setDepsSelected}
        />
        <Filter
          filterOpen={filterOpen["პრიორიტეტი"]}
          filterName="პრიორიტეტი"
          handleFilterBox={handleFilterBox}
          value={prioritiesSelected}
          setValue={setPrioritiesSelected}
        />
        <Filter
          filterOpen={filterOpen["თანამშრომელი"]}
          filterName="თანამშრომელი"
          handleFilterBox={handleFilterBox}
          value={employeeSelected}
          setValue={setEmployeeSelected}
          employeesData={employeesData}
        />
      </div>
      <ol className="flex flex-row gap-[8px] items-center my-[25px] flex-wrap text-[#343A40] font-light">
        {depsSelected.map((dep) => (
          <li
            className="flex flex-row gap-1 items-center py-1.5 px-2.5 border border-[#CED4DA] rounded-[43px]"
            key={dep.id}
          >
            <p>{dep.name}</p>
            <img
              src={XIcon}
              alt="x icon"
              className="hover:cursor-pointer"
              onClick={() =>
                setDepsSelected((prevValues) => {
                  localStorage.setItem(
                    "დეპარტამენტი",
                    JSON.stringify([
                      ...prevValues.filter((obj) => obj.id !== dep.id),
                    ])
                  );
                  return prevValues.filter((obj) => obj.id !== dep.id);
                })
              }
            />
          </li>
        ))}
        {prioritiesSelected.map((priority) => (
          <li
            className="flex flex-row gap-1 items-center py-1.5 px-2.5 border border-[#CED4DA] rounded-[43px]"
            key={priority.id}
          >
            <p>{priority.name}</p>
            <img
              src={XIcon}
              alt="x icon"
              className="hover:cursor-pointer"
              onClick={() =>
                setPrioritiesSelected((prevValues) => {
                  localStorage.setItem(
                    "პრიორიტეტი",
                    JSON.stringify([
                      ...prevValues.filter((obj) => obj.id !== priority.id),
                    ])
                  );
                  return prevValues.filter((obj) => obj.id !== priority.id);
                })
              }
            />
          </li>
        ))}
        {employeeSelected.id && (
          <li className="flex flex-row gap-1 items-center py-1.5 px-2.5 border border-[#CED4DA] rounded-[43px]">
            <p>{employeeSelected.name + " " + employeeSelected.surname}</p>
            <img
              src={XIcon}
              alt="x icon"
              className="hover:cursor-pointer"
              onClick={() => {
                setEmployeeSelected({});
                localStorage.removeItem("თანამშრომელი");
              }}
            />
          </li>
        )}
        {(depsSelected.length > 0 ||
          prioritiesSelected.length > 0 ||
          employeeSelected.id) && (
          <li
            className="py-1.5 px-2.5 hover:cursor-pointer"
            onClick={() => {
              setDepsSelected([]);
              setPrioritiesSelected([]);
              setEmployeeSelected({});
              localStorage.clear();
            }}
          >
            გასუფთავება
          </li>
        )}
      </ol>
      <div className="grid grid-cols-4 gap-[52px] text-center">
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#F7BC30] rounded-[10px]">
            დასაწყები
          </h3>
          <TaskCard
            data={notStarted}
            color="border-[#F7BC30]"
            depFilter={depsSelected.map((dep) => dep.id)}
            priorityFilter={prioritiesSelected.map((priority) => priority.id)}
            employeeFilter={employeeSelected.id}
          />
        </div>
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#FB5607] rounded-[10px]">
            პროგრესში
          </h3>
          <TaskCard
            data={inProgress}
            color="border-[#FB5607]"
            depFilter={depsSelected.map((dep) => dep.id)}
            priorityFilter={prioritiesSelected.map((priority) => priority.id)}
            employeeFilter={employeeSelected.id}
          />
        </div>
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#FF006E] rounded-[10px]">
            მზად ტესტირებისთვის
          </h3>
          <TaskCard
            data={readyForTest}
            color="border-[#FF006E]"
            depFilter={depsSelected.map((dep) => dep.id)}
            priorityFilter={prioritiesSelected.map((priority) => priority.id)}
            employeeFilter={employeeSelected.id}
          />
        </div>
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#3A86FF] rounded-[10px]">
            დასრულებული
          </h3>
          <TaskCard
            data={finished}
            color="border-[#3A86FF]"
            depFilter={depsSelected.map((dep) => dep.id)}
            priorityFilter={prioritiesSelected.map((priority) => priority.id)}
            employeeFilter={employeeSelected.id}
          />
        </div>
      </div>
    </>
  );
}

import Header from "../Header";
import { useState } from "react";
import Filter from "./Filter";
import Modal from "../modal/Modal";
import useGetTasks from "../../hooks/useGetTasks";
import TaskCard from "./TaskCard";

export default function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const data = useGetTasks();
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
  const [employeeSelected, setEmployeeSelected] = useState();
  const [prioritiesSelected, setPrioritiesSelected] = useState([]);
  const [depsSelected, setDepsSelected] = useState([]);

  function handleFilterBox(name) {
    setFilterOpen({ [name]: !filterOpen[name] });
  }

  console.log(data);
  console.log(finished);

  return (
    <>
      <Modal open={modalOpen} onModalClose={() => setModalOpen(false)} />
      <Header onModalClick={() => setModalOpen(true)} />
      <h1 className="text-[34px] font-semibold mb-[52px]">
        დავალებების გვერდი
      </h1>
      <div className="flex flex-row justify-between items-center border border-[#DEE2E6] px-[18px] py-[10px] rounded-[10px] gap-[45px] w-[688px] font-normal text-base relative mb-[79px]">
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
        />
      </div>
      <div className="grid grid-cols-4 gap-[52px] text-center">
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#F7BC30] rounded-[10px]">
            დასაწყები
          </h3>
          <TaskCard data={notStarted} color="border-[#F7BC30]" />
        </div>
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#FB5607] rounded-[10px]">
            პროგრესში
          </h3>
          <TaskCard data={inProgress} color="border-[#FB5607]" />
        </div>
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#FF006E] rounded-[10px]">
            მზად ტესტირებისთვის
          </h3>
          <TaskCard data={readyForTest} color="border-[#FF006E]" />
        </div>
        <div className="flex flex-col gap-[30px]">
          <h3 className="py-[15px] text-white bg-[#3A86FF] rounded-[10px]">
            დასრულებული
          </h3>
          <TaskCard data={finished} color="border-[#3A86FF]" />
        </div>
      </div>
    </>
  );
}

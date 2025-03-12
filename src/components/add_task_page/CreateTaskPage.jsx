import { useState } from "react";
import Header from "../Header";
import Modal from "../modal/Modal";
import TaskInput from "./TaskInput";
import DepartmentSelect from "../DepartmentSelect";
import EmployeesSelect from "./EmployeesSelect";
import SmallSelect from "./SmallSelect";
import TaskDate from "./TaskDate";

export default function CreateTaskPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal open={modalOpen} onModalClose={() => setModalOpen(false)} />
      <Header onModalClick={() => setModalOpen(true)} />
      <h1 className="text-[34px] font-semibold mb-[25px]">
        შექმენი ახალი დავალება
      </h1>
      <div className="w-full h-[958px] flex flex-col gap-[55px] bg-[#FBF9FFA6] border-[0.3px] border-[#DDD2FF] rounded-[4px] pt-[65px] pl-[55px] mb-20">
        <div className="flex flex-row gap-[161px] items-start">
          <TaskInput type="text" />
          <DepartmentSelect type="taskDeps" />
        </div>
        <div className="flex flex-row gap-[161px] items-start">
          <TaskInput type="textarea" />
          <EmployeesSelect setModalOpen={setModalOpen} />
        </div>
        <div className="flex flex-row gap-[161px] items-start">
          <div className="w-[550px] flex flex-row gap-8">
            <SmallSelect type="priority" title="პრიორიტეტი*" />
            <SmallSelect type="status" title="სტატუსი*" />
          </div>
          <div>
            <TaskDate />
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import Header from "../Header";
import Modal from "../modal/Modal";
import TaskInput from "./TaskInput";
import DepartmentSelect from "../DepartmentSelect";
import EmployeesSelect from "./EmployeesSelect";
import SmallSelect from "./SmallSelect";
import TaskDate from "./TaskDate";
import Button from "../Button";
import useCreateTask from "../../hooks/useCreateTask";

export default function CreateTaskPage() {
  const { createTask } = useCreateTask();
  const [modalOpen, setModalOpen] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    name: "",
    description: "",
    due_date: "",
    status_id: "",
    employee_id: "",
    priority_id: "",
    department_id: "",
  });

  function handleTaskChange(key, value) {
    setTaskInfo((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  }

  async function handleCreateTask() {
    try {
      const response = await createTask(taskInfo);
      console.log("Task created successfully: ", response);
    } catch (error) {
      console.error("Failed to create task: ", error);
    }
  }

  console.log(taskInfo);

  return (
    <>
      <Modal open={modalOpen} onModalClose={() => setModalOpen(false)} />
      <Header onModalClick={() => setModalOpen(true)} />
      <h1 className="text-[34px] font-semibold mb-[25px]">
        შექმენი ახალი დავალება
      </h1>
      <div className="w-full h-[958px] flex flex-col gap-[55px] bg-[#FBF9FFA6] border-[0.3px] border-[#DDD2FF] rounded-[4px] pt-[65px] pl-[55px] mb-20">
        <div className="flex flex-row gap-[161px] items-start">
          <TaskInput
            type="text"
            title="სათაური*"
            inputName="name"
            onChange={handleTaskChange}
            inputValue={taskInfo.name}
          />
          <DepartmentSelect
            type="taskDeps"
            depValue={taskInfo.department_id}
            handleChange={handleTaskChange}
          />
        </div>
        <div className="flex flex-row gap-[161px] items-start">
          <TaskInput
            type="textarea"
            title="აღწერა"
            inputName="description"
            onChange={handleTaskChange}
            inputValue={taskInfo.description}
          />
          {taskInfo.department_id && (
            <EmployeesSelect
              setModalOpen={setModalOpen}
              handleChange={handleTaskChange}
              empValue={taskInfo.employee_id}
            />
          )}
        </div>
        <div className="flex flex-row gap-[161px] items-start">
          <div className="w-[550px] flex flex-row gap-8">
            <SmallSelect
              type="priority"
              title="პრიორიტეტი*"
              handleChange={handleTaskChange}
              infoKey="priority_id"
              selectValue={taskInfo.priority_id}
            />
            <SmallSelect
              type="status"
              title="სტატუსი*"
              handleChange={handleTaskChange}
              infoKey="status_id"
              selectValue={taskInfo.status_id}
            />
          </div>
          <div>
            <TaskDate handleChange={handleTaskChange} />
          </div>
        </div>
        <div className="w-[1261px] flex flex-row justify-end">
          <Button dark={true} onClick={handleCreateTask}>
            დავალების შექმნა
          </Button>
        </div>
      </div>
    </>
  );
}

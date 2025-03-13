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
import { useNavigate } from "react-router-dom";

export default function CreateTaskPage() {
  const { createTask } = useCreateTask();
  const [modalOpen, setModalOpen] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];
  const [taskInfo, setTaskInfo] = useState({
    name: localStorage.getItem("name") || "",
    description: localStorage.getItem("description") || "",
    due_date: localStorage.getItem("due_date") || defaultDate,
    status_id: localStorage.getItem("status_id") || "",
    employee_id: localStorage.getItem("employee_id") || "",
    priority_id: localStorage.getItem("priority_id") || "",
    department_id: localStorage.getItem("department_id") || "",
  });
  const [taskError, setTaskError] = useState({
    name: false,
    description: false,
    due_date: false,
    status_id: false,
    employee_id: false,
    priority_id: false,
    department_id: false,
  });
  let navigate = useNavigate();

  function handleTaskChange(key, value) {
    setTaskInfo((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
    localStorage.setItem(key, value);
  }

  function handleValidation(key, value) {
    setTaskError((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  }

  async function handleCreateTask() {
    const taskObject = {};

    for (const key in taskInfo) {
      if (key !== "department_id") {
        taskObject[key] = taskInfo[key];
      }
    }

    console.log(taskObject);

    try {
      const response = await createTask(taskInfo);
      console.log("Task created successfully: ", response);
      setTaskInfo({
        name: "",
        description: "",
        due_date: "",
        status_id: "",
        employee_id: "",
        priority_id: "",
        department_id: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create task: ", error);
    }
  }

  console.log(taskInfo);
  console.log(taskInfo.department_id);
  console.log(taskError);

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
            handleValidation={handleValidation}
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
            handleValidation={handleValidation}
          />
          {taskInfo.department_id && (
            <EmployeesSelect
              setModalOpen={setModalOpen}
              handleChange={handleTaskChange}
              empValue={taskInfo.employee_id}
              dep_id={taskInfo.department_id}
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
            <TaskDate
              handleChange={handleTaskChange}
              dateValue={taskInfo.due_date}
            />
          </div>
        </div>
        <div className="w-[1261px] flex flex-row justify-end mt-[90px]">
          <Button dark={true} onClick={handleCreateTask}>
            დავალების შექმნა
          </Button>
        </div>
      </div>
    </>
  );
}

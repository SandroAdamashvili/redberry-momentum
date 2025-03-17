import { useEffect, useState } from "react";
import Header from "../Header";
import Modal from "../modal/Modal";
import TaskInput from "./TaskInput";
import DepartmentSelect from "../DepartmentSelect";
import EmployeesSelect from "./EmployeesSelect";
import SmallSelect from "./SmallSelect";
import TaskDate from "./TaskDate";
import Button from "../Button";
import useCreateTask from "../../hooks/useCreateTask";
import useGetEmployees from "../../hooks/useGetEmployees";
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
    status_id: localStorage.getItem("status_id") || 1,
    employee_id: Number(localStorage.getItem("employee_id")) || "",
    priority_id: localStorage.getItem("priority_id") || 2,
    department_id: Number(localStorage.getItem("department_id")) || "",
  });
  const [taskError, setTaskError] = useState({
    name: localStorage.getItem("validation")
      ? JSON.parse(localStorage.getItem("validation")).name
      : false,
    description: localStorage.getItem("validation")
      ? JSON.parse(localStorage.getItem("validation")).description
      : false,
    employee_id: localStorage.getItem("validation")
      ? JSON.parse(localStorage.getItem("validation")).employee_id
      : false,
    department_id: localStorage.getItem("validation")
      ? JSON.parse(localStorage.getItem("validation")).department_id
      : false,
  });
  const { data, setData } = useGetEmployees();
  let navigate = useNavigate();

  function handleTaskChange(key, value) {
    setTaskInfo((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
    localStorage.setItem(key, value);
  }

  function handleValidation(key, value) {
    setTaskError((prevValues) => {
      localStorage.setItem(
        "validation",
        JSON.stringify({ ...prevValues, [key]: value })
      );
      return {
        ...prevValues,
        [key]: value,
      };
    });
  }

  function updateEmployees(newData) {
    setData(newData);
  }

  async function handleCreateTask() {
    const taskObject = {};

    for (const key in taskInfo) {
      if (key !== "department_id") {
        taskObject[key] = taskInfo[key];
      }
    }

    if (
      taskInfo.department_id === "" ||
      taskInfo.employee_id === "" ||
      taskInfo.name === "" ||
      taskInfo.name.length < 3 ||
      taskInfo.name.length > 255 ||
      (taskInfo.description.length > 0 && taskInfo.description.length < 4) ||
      taskInfo.description.length > 255
    ) {
      taskInfo.department_id === "" && handleValidation("department_id", true);
      taskInfo.department_id !== "" &&
        taskInfo.employee_id === "" &&
        handleValidation("employee_id", true);
      (taskInfo.name === "" ||
        taskInfo.name.length < 3 ||
        taskInfo.name.length > 255) &&
        handleValidation("name", true);
      ((taskInfo.description.length > 0 && taskInfo.description.length < 4) ||
        taskInfo.description.length > 255) &&
        handleValidation("description", true);
      return;
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

  return (
    <>
      <Modal
        open={modalOpen}
        onModalClose={() => setModalOpen(false)}
        updateEmployees={updateEmployees}
        updateRequired={true}
      />
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
            validation={taskError.name}
          />
          <DepartmentSelect
            type="taskDeps"
            depValue={taskInfo.department_id}
            handleChange={handleTaskChange}
            validation={taskError.department_id}
            handleValidation={handleValidation}
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
            validation={taskError.description}
          />
          {taskInfo.department_id && (
            <EmployeesSelect
              setModalOpen={setModalOpen}
              handleChange={handleTaskChange}
              empValue={taskInfo.employee_id}
              dep_id={taskInfo.department_id}
              validation={taskError.employee_id}
              handleValidation={handleValidation}
              employeesData={data}
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

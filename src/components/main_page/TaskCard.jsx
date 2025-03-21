import { useNavigate } from "react-router-dom";
import Comment from "../../assets/comments.svg";

export default function TaskCard({
  data,
  color,
  depFilter,
  priorityFilter,
  employeeFilter,
}) {
  const navigate = useNavigate();
  const priorities = ["#08A508", "#FFBE0B", "#FA4D4D"];
  const depColors = ["#FFD86D", "#FD9A6A", "#FF66A8", "#89B6FF"];
  const deps = [
    "ადმინისტრაცია",
    "ადამიანური რეს.",
    "ფინანსები",
    "მარკეტინგი",
    "ლოჯისტიკა",
    "ტექნოლოგიები",
    "მედია",
  ];

  function getGeorgianMonthName(monthNumber) {
    const months = [
      "იან",
      "თებ",
      "მარ",
      "აპრ",
      "მაისი",
      "ივნ",
      "ივლ",
      "აგვ",
      "სექტ",
      "ოქტ",
      "ნოემბ",
      "დეკ",
    ];
    return months[Number(monthNumber) - 1];
  }

  return (
    <>
      {data.map(
        (task) =>
          (depFilter.length === 0 || depFilter.includes(task.department.id)) &&
          (priorityFilter.length === 0 ||
            priorityFilter.includes(task.priority.id)) &&
          (!employeeFilter || employeeFilter === task.employee.id) && (
            <div
              key={task.id}
              className={`w-full flex flex-col gap-[28px] border ${color} rounded-[15px] p-[20px] hover:cursor-pointer`}
              onClick={() => {
                navigate(`/task/${task.id}`);
                localStorage.clear();
              }}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-[10px] text-[12px] items-center">
                  <div
                    className="flex flex-row w-[86px] items-center gap-1 text-xs font-medium p-1 border-[0.5px] rounded-[4px]"
                    style={{
                      color: priorities[task.priority.id - 1],
                      borderColor: priorities[task.priority.id - 1],
                    }}
                  >
                    <img src={task.priority.icon} alt="icon" />
                    {task.priority.name}
                  </div>
                  <div
                    className="px-[9px] py-[5px] rounded-[15px] text-white"
                    style={{
                      backgroundColor:
                        depColors[Math.floor(Math.random() * depColors.length)],
                    }}
                  >
                    {deps[task.department.id - 1]}
                  </div>
                </div>
                <p className="text-xs text-[#212529]">
                  {task.due_date.split("-")[2].split("T")[0] +
                    " " +
                    getGeorgianMonthName(task.due_date.split("-")[1]) +
                    ", " +
                    task.due_date.split("-")[0]}
                </p>
              </div>
              <div className="text-left flex flex-col gap-3">
                <p className="text-[15px] font-medium">{task.name}</p>
                <p className="text-[14px] font-normal">
                  {task.description && task.description.length > 100
                    ? task.description.slice(0, 100) + "..."
                    : task.description}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <img
                  src={task.employee.avatar}
                  alt="avatar"
                  className="w-[31px] h-[31px] rounded-[100px]"
                />
                <div className="flex flex-row gap-1 items-center">
                  <img src={Comment} alt="comment icon" />
                  <p className="text-[14px]">{task.total_comments}</p>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
}

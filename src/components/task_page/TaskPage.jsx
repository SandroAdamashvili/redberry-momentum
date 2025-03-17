import { useParams } from "react-router-dom";
import Header from "../Header";
import useGetSingleTask from "../../hooks/useGetSingleTask";
import useAddComment from "../../hooks/useAddComment";
import useGetComments from "../../hooks/useGetComments";
import { useState } from "react";
import Modal from "../modal/Modal";
import Chart from "../../assets/pie-chart.svg";
import User from "../../assets/user.svg";
import Calendar from "../../assets/calendar.svg";
import TaskStatusSelect from "./TaskStatusSelect";
import CommentTextField from "./CommentTextField";
import Comments from "./Comments";

export default function TaskPage() {
  const { id } = useParams();
  const data = useGetSingleTask(id);
  const [modalOpen, setModalOpen] = useState(false);
  const priorities = ["#08A508", "#FFBE0B", "#FA4D4D"];
  const { addComment } = useAddComment(id);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState();
  const [commentsData, setCommentsData] = useGetComments(id);

  async function createComment(obj) {
    try {
      const newComment = await addComment(obj);
      console.log(newComment);
      setComment("");
      setReply("");

      setCommentsData((prevValues) => {
        if (obj.parent_id) {
          return prevValues.map((comment) =>
            comment.id === obj.parent_id
              ? {
                  ...comment,
                  sub_comments: [...(comment.sub_comments || []), newComment],
                }
              : comment
          );
        } else {
          return [...prevValues, newComment];
        }
      });
    } catch (error) {
      console.error("error: ", error);
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);

    const weekdays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
    const weekDay = weekdays[date.getUTCDay()];
    const formattedDate = `${weekDay} - ${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;

    return formattedDate;
  }

  return (
    <>
      <Modal
        open={modalOpen}
        onModalClose={() => setModalOpen(false)}
        updateRequired={false}
      />
      <Header onModalClick={() => setModalOpen(true)} />
      <div className="flex flex-row gap-[223px] justify-between">
        <div className="flex flex-col w-[715px] mt-[40px]">
          <div className="flex flex-row gap-[18px] items-center">
            <div
              className="flex flex-row gap-1 items-center border-[0.5px] px-[5px] py-1 rounded-[3px]"
              style={{
                borderColor: priorities[data?.priority?.id - 1],
              }}
            >
              <img src={data?.priority?.icon} alt="icon" />
              <p
                className="text-base font-medium"
                style={{
                  color: priorities[data?.priority?.id - 1],
                }}
              >
                {data?.priority?.name}
              </p>
            </div>
            <div className="text-base text-white bg-[#FF66A8] px-[10px] py-[5px] rounded-[15px]">
              {data?.department?.name}
            </div>
          </div>
          <h1 className="text-[34px] font-semibold mt-3 mb-9">{data?.name}</h1>
          <p className="text-lg font-normal mb-[63px]">{data?.description}</p>
          <h2 className="text-2xl font-medium py-[10px] mb-[18px]">
            დავალების დეტალები
          </h2>
          <div className="grid grid-cols-2 w-[493px]">
            <div className="text-[#474747]">
              <div className="h-[70px] flex flex-row items-center gap-1.5">
                <img src={Chart} alt="pie chart" />
                <p className="text-base">სტატუსი</p>
              </div>
              <div className="h-[70px] flex flex-row items-center gap-1.5">
                <img src={User} alt="pie chart" />
                <p className="text-base">თანამშრომელი</p>
              </div>
              <div className="h-[70px] flex flex-row items-center gap-1.5">
                <img src={Calendar} alt="pie chart" />
                <p className="text-base">დავალების ვადა</p>
              </div>
            </div>
            <div className="w-[259px]">
              <div className="h-[70px] flex flex-row items-center">
                <TaskStatusSelect
                  selectValue={data?.status?.name}
                  taskId={data?.id}
                />
              </div>
              <div className="h-[70px] flex flex-row items-center gap-[5.5px]">
                <img
                  src={data?.employee?.avatar}
                  alt="avatar"
                  className="w-[32px] h-[32px] rounded-[100px]"
                />
                <div className="text-sm font-normal relative">
                  <p>{data?.employee?.name + " " + data?.employee?.surname}</p>
                  <p className="w-[259px] absolute bottom-5 text-[11px] text-[#474747] font-light">
                    {data?.department?.name}
                  </p>
                </div>
              </div>
              <div className="h-[70px] flex flex-row items-center">
                {formatDate(data?.due_date)}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[741px] my-[100px] px-[45px] py-[40px] bg-[#F8F3FEA6] border-[0.3px] border-[#DDD2FF] rounded-[10px]">
          <CommentTextField
            comment={comment}
            setComment={setComment}
            createComment={createComment}
          />
          <Comments
            data={commentsData}
            commentText={reply}
            setComment={setReply}
            createComment={createComment}
          />
        </div>
      </div>
    </>
  );
}

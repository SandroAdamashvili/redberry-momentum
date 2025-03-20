import { useState } from "react";
import Reply from "../../assets/reply.svg";
import CommentTextField from "./CommentTextField";

export default function Comments({
  data,
  commentText,
  setComment,
  createComment,
}) {
  const [replyOpen, setReplyOpen] = useState({});

  return (
    <div className="flex flex-col gap-[40px] mt-[66px]">
      <div className="flex flex-row items-center gap-[7px]">
        <h3>კომენტარები</h3>
        <span className="px-[10px] py-[2.5px] flex items-center justify-center text-white text-sm font-medium rounded-[30px] bg-[#8338EC]">
          {data.reduce(
            (accumulator, currentValue) =>
              accumulator + 1 + (currentValue.sub_comments?.length || 0),
            0
          )}
        </span>
      </div>
      <ol className="flex flex-col gap-[40px]">
        {data?.map((comment) => (
          <li key={comment.id}>
            <div className="flex flex-row items-start gap-[12px]">
              <img
                src={comment.author_avatar}
                alt="author avatar"
                className="w-[38px] h-[38px] rounded-[40px]"
              />
              <div className="flex flex-col gap-[8px]">
                <p className="text-[18px] font-medium">
                  {comment.author_nickname}
                </p>
                <p className="text-base font-light">{comment.text}</p>
                <div
                  className="flex flex-row gap-1.5 hover:cursor-pointer"
                  onClick={() => {
                    setReplyOpen({ [comment.id]: !replyOpen[comment.id] });
                    setComment("");
                  }}
                >
                  <img src={Reply} alt="reply icon" />
                  <p className="text-base text-[#8338EC] font-light">
                    {replyOpen[comment.id] ? "გაუქმება" : "უპასუხე"}
                  </p>
                </div>
              </div>
            </div>
            {replyOpen[comment.id] && (
              <CommentTextField
                comment={commentText}
                setComment={setComment}
                createComment={createComment}
                parent_id={comment.id}
                setReplyOpen={setReplyOpen}
                replyOpen={replyOpen}
              />
            )}
            <ol>
              {comment?.sub_comments?.map((sub) => (
                <li
                  key={sub.id}
                  className="flex flex-row items-start gap-[12px] mt-[20px] ml-[50px]"
                >
                  <img
                    src={sub.author_avatar}
                    alt="sub author avatar"
                    className="w-[38px] h-[38px] rounded-[40px]"
                  />
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[18px] font-medium">
                      {sub.author_nickname}
                    </p>
                    <p className="text-base font-light">{sub.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}

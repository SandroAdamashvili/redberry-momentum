import { useState } from "react";

export default function CommentTextField({
  comment,
  setComment,
  createComment,
  parent_id = null,
  replyOpen = false,
  setReplyOpen,
}) {
  const [isValid, setIsValid] = useState(true);

  return (
    <div
      className="relative w-full bg-white border-[0.3px] px-[20px] pt-[18px] pb-[70px] rounded-[10px]"
      style={{ borderColor: isValid ? "#ADB5BD" : "#FA4D4D" }}
    >
      <textarea
        placeholder="დაწერე კომენტარი"
        className="w-full min-h-[50px] placeholder:text-[#898989] placeholder:font-light placeholder:text-sm focus:outline-none field-sizing-content resize-none"
        onChange={(e) => {
          setComment(e.target.value);
          setIsValid(e.target.value.trim().length > 0);
        }}
        value={comment}
      ></textarea>
      <div className="absolute right-2 bottom-5 px-[20px]">
        <button
          className="text-base text-white px-[20px] py-2 bg-[#8338EC] rounded-[20px] hover:cursor-pointer hover:bg-[#B588F4]"
          onClick={() => {
            setIsValid(comment.trim().length > 0);
            comment.trim().length > 0 &&
              createComment({ text: comment, parent_id: parent_id });
            replyOpen && setReplyOpen(false);
          }}
        >
          დააკომენტარე
        </button>
      </div>
    </div>
  );
}

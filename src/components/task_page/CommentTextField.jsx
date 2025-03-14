export default function CommentTextField({
  comment,
  setComment,
  createComment,
  parent_id = null,
}) {
  return (
    <div className="relative w-full bg-white border-[0.3px] border-[#ADB5BD] px-[20px] pt-[18px] pb-[70px] rounded-[10px]">
      <textarea
        placeholder="დაწერე კომენტარი"
        className="w-full min-h-[50px] placeholder:text-[#898989] placeholder:font-light placeholder:text-sm focus:outline-none field-sizing-content resize-none"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <div className="absolute right-2 bottom-5 px-[20px]">
        <button
          className="text-base text-white px-[20px] py-2 bg-[#8338EC] rounded-[20px]"
          onClick={() => createComment({ text: comment, parent_id: parent_id })}
        >
          დააკომენტარე
        </button>
      </div>
    </div>
  );
}

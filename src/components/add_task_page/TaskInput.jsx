export default function TaskInput({ type }) {
  return (
    <div className="w-[550px] flex flex-col">
      <p>სათაური*</p>
      {type === "text" ? (
        <input
          type={type}
          className="w-[550px] h-[45px] border border-[#CED4DA] bg-white rounded-[6px] p-[10px] focus:outline-none mb-2"
        />
      ) : (
        <textarea className="w-[550px] h-[133px] border border-[#CED4DA] bg-white rounded-[6px] p-[10px] focus:outline-none mb-2"></textarea>
      )}
      <p className="text-xs font-light text-[#6C757D]">მინიმუმ 2 სიმბოლო</p>
      <p className="text-xs font-light text-[#6C757D]">მაქსიმუმ 255 სიმბოლო</p>
    </div>
  );
}

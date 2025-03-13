export default function TaskDate({ handleChange, dateValue }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <p>დედლაინი</p>
      <input
        type="date"
        className="w-[320px] h-[45px] p-[14px] text-[#ADB5BD] border border-[#CED4DA] bg-white rounded-md focus:outline-none"
        onChange={(e) => handleChange("due_date", e.target.value)}
        min={today}
        defaultValue={dateValue}
      />
    </div>
  );
}

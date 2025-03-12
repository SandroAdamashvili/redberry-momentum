export default function Button({ children, dark, ...props }) {
  return (
    <div
      className={`flex justify-center items-center border px-[20px] py-[10px] rounded-[5px] ${
        dark
          ? "bg-[#8338EC] text-white hover:bg-[#B588F4]"
          : "border-[#8338EC] hover:border-[#B588F4]"
      } hover:cursor-pointer`}
      {...props}
    >
      {children}
    </div>
  );
}

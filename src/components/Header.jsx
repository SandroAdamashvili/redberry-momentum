import Logo from "../assets/logo.png";
import PlusIcon from "../assets/plus.svg";

export default function Header() {
  return (
    <div className="w-full h-[100px] flex justify-between py-[31px] text-base mb-[40px]">
      <img src={Logo} alt="logo" className="w-[210px] h-[38px]" />
      <div className="flex flex-row gap-[40px]">
        <button className="flex justify-center items-center border border-[#8338EC] px-[20px] py-[10px] rounded-[5px]">
          თანამშრომლის შექმნა
        </button>
        <div className="flex flex-row justify-center items-center gap-[4px] bg-[#8338EC] text-white px-[20px] py-[10px] rounded-[5px]">
          <img src={PlusIcon} alt="plus icon" />
          <p>შექმენი ახალი დავალება</p>
        </div>
      </div>
    </div>
  );
}

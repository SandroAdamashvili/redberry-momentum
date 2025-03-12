import Logo from "../assets/logo.png";
import PlusIcon from "../assets/plus.svg";
import Button from "./Button";

export default function Header({ onModalClick }) {
  return (
    <div className="w-full h-[100px] flex justify-between py-[31px] text-base mb-[40px]">
      <img src={Logo} alt="logo" className="w-[210px] h-[38px]" />
      <div className="flex flex-row gap-[40px]">
        <Button onClick={onModalClick} dark={false}>
          თანამშრომლის შექმნა
        </Button>
        <div className="flex flex-row justify-center items-center gap-[4px] bg-[#8338EC] text-white px-[20px] py-[10px] rounded-[5px] hover:bg-[#B588F4] hover:cursor-pointer">
          <img src={PlusIcon} alt="plus icon" />
          <p>შექმენი ახალი დავალება</p>
        </div>
      </div>
    </div>
  );
}

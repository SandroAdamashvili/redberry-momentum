import Header from "../Header";
import ArrDown from "../../assets/arrow-down.svg";

export default function MainPage() {
  return (
    <>
      <Header />
      <h1 className="text-[34px] font-semibold mb-[52px]">
        დავალებების გვერდი
      </h1>
      <div className="flex flex-row justify-between items-center border border-[#DEE2E6] px-[18px] py-[10px] rounded-[10px] gap-[45px] w-[688px] font-normal text-base relative">
        <div className="flex flex-row gap-2">
          <p>დეპარტამენტი</p>
          <img src={ArrDown} alt="arrow down icon" />
        </div>
        <div className="flex flex-row gap-2">
          <p>დეპარტამენტი</p>
          <img src={ArrDown} alt="arrow down icon" />
        </div>
        <div className="flex flex-row gap-2">
          <p>დეპარტამენტი</p>
          <img src={ArrDown} alt="arrow down icon" />
        </div>
        <div className="absolute w-full h-[274px] border-[0.5px] border-[#8338EC] bg-white rounded-[10px] right-0 top-14"></div>
      </div>
    </>
  );
}

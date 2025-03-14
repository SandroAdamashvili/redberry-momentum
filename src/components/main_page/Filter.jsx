import ArrDown from "../../assets/arrow-down.svg";
import useGetDeps from "../../hooks/useGetDeps";
import useGetPriority from "../../hooks/useGetPriority";
import PurpleArr from "../../assets/purple-arrow-down.svg";
import Check from "../../assets/check.svg";
import Checked from "../../assets/checked.svg";
import useGetEmployees from "../../hooks/useGetEmployees";

export default function Filter({
  filterOpen,
  filterName,
  handleFilterBox,
  value,
  setValue,
}) {
  const data =
    filterName === "დეპარტამენტი"
      ? useGetDeps()
      : filterName === "პრიორიტეტი"
      ? useGetPriority()
      : useGetEmployees();

  return (
    <>
      <div
        className="flex flex-row gap-2 hover:cursor-pointer"
        onClick={() => handleFilterBox(filterName)}
      >
        <p
          style={{
            color: filterOpen ? "#8338EC" : "#0D0F10",
          }}
        >
          {filterName}
        </p>
        <img src={filterOpen ? PurpleArr : ArrDown} alt="arrow down icon" />
      </div>
      <div
        className={`absolute w-full h-[274px] border-[0.5px] pt-[40px] px-[30px] border-[#8338EC] bg-white rounded-[10px] right-0 top-14 ${
          !filterOpen && "hidden"
        }`}
      >
        {filterOpen && (
          <ol className="flex flex-col gap-[22px] text-base h-[170px] overflow-y-auto">
            {data.map((item) =>
              filterName === "დეპარტამენტი" ? (
                <li
                  key={item.id}
                  className="flex flex-row gap-[15px] items-center hover:cursor-pointer"
                  onClick={() =>
                    setValue((prevValues) => {
                      return value.find((obj) => obj.id === item.id)
                        ? prevValues.filter((obj) => obj.id !== item.id)
                        : [...prevValues, item];
                    })
                  }
                >
                  <img
                    src={
                      value.find((obj) => obj.id === item.id) ? Checked : Check
                    }
                    alt="check"
                  />
                  <p>{item.name}</p>
                </li>
              ) : filterName === "პრიორიტეტი" ? (
                <li
                  key={item.id}
                  className="flex flex-row gap-[15px] items-center hover:cursor-pointer"
                  onClick={() =>
                    setValue((prevValues) => {
                      return value.find((obj) => obj.id === item.id)
                        ? prevValues.filter((obj) => obj.id !== item.id)
                        : [...prevValues, item];
                    })
                  }
                >
                  <img
                    src={
                      value.find((obj) => obj.id === item.id) ? Checked : Check
                    }
                    alt="check"
                  />
                  <p>{item.name}</p>
                </li>
              ) : (
                <li
                  key={item.id}
                  className="flex flex-row gap-[15px] items-center hover:cursor-pointer"
                  onClick={() => {
                    return value.id === item.id ? setValue({}) : setValue(item);
                  }}
                >
                  <img
                    src={value.id === item.id ? Checked : Check}
                    alt="check"
                  />
                  <div className="flex flex-row gap-[10px] items-center">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="w-[28px] h-[28px] rounded-[100px]"
                    />
                    <p>{item.name + " " + item.surname}</p>
                  </div>
                </li>
              )
            )}
          </ol>
        )}
      </div>
    </>
  );
}

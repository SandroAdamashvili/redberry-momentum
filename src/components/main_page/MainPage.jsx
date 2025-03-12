import Header from "../Header";
import { useState } from "react";
import Filter from "./Filter";
import Modal from "../modal/Modal";

export default function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal open={modalOpen} onModalClose={() => setModalOpen(false)} />
      <Header onModalClick={() => setModalOpen(true)} />
      <h1 className="text-[34px] font-semibold mb-[52px]">
        დავალებების გვერდი
      </h1>
      <Filter />
      <div className="grid grid-cols-4 gap-[52px] text-center">
        <div className="flex flex-col gap-[30px] py-[15px] text-white bg-[#F7BC30] rounded-[10px]">
          <h3>დასაწყები</h3>
        </div>
        <div className="flex flex-col gap-[30px] py-[15px] text-white bg-[#FB5607] rounded-[10px]">
          <h3>პროგრესში</h3>
        </div>
        <div className="flex flex-col gap-[30px] py-[15px] text-white bg-[#FF006E] rounded-[10px]">
          <h3>მზად ტესტირებისთვის</h3>
        </div>
        <div className="flex flex-col gap-[30px] py-[15px] text-white bg-[#3A86FF] rounded-[10px]">
          <h3>დასრულებული</h3>
        </div>
      </div>
    </>
  );
}

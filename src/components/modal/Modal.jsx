import { useEffect, useRef, useState } from "react";
import Cancel from "../../assets/cancel.svg";
import ModalInput from "./ModalInput";
import DepartmentSelect from "../DepartmentSelect";
import ModalImage from "./ModalImage";
import Button from "../Button";

export default function Modal({ open, onModalClose }) {
  const dialogRef = useRef();
  const [modalInfo, setModalInfo] = useState({
    name: "",
    surname: "",
    image: null,
    department: "",
  });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  function handleModalChange(key, value) {
    setModalInfo((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  }

  function handleModalClose() {
    onModalClose();
    setModalInfo({
      name: "",
      surname: "",
      image: null,
      department: "",
    });
    setImageSrc(null);
  }

  function handleImgChange(event) {
    const file = event.target.files[0];
    if (file && file.size < 600000 && file.type.startsWith("image")) {
      console.log(file);
      handleModalChange("image", file);
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  }

  console.log(modalInfo);

  return (
    <dialog
      ref={dialogRef}
      className="modal w-[913px] m-auto px-[50px] pb-[60px] pt-[40px]"
    >
      <div
        className="flex justify-end mb-[37px] hover:cursor-pointer"
        onClick={handleModalClose}
      >
        <img src={Cancel} alt="cancel icon" />
      </div>
      <div className="flex flex-col items-center gap-[45px]">
        <h1 className="text-[32px] font-medium">თანამშრომლის დამატება</h1>
        <div className="w-full flex flex-row gap-[45px]">
          <ModalInput
            title="სახელი*"
            onChange={handleModalChange}
            inputName="name"
            inputValue={modalInfo.name}
          />
          <ModalInput
            title="გვარი*"
            onChange={handleModalChange}
            inputName="surname"
            inputValue={modalInfo.surname}
          />
        </div>
        <ModalImage
          handleChange={handleModalChange}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          handleImgChange={handleImgChange}
        />
        <DepartmentSelect
          depValue={modalInfo.department}
          handleChange={handleModalChange}
        />
        <div className="w-full flex flex-row justify-end gap-[22px]">
          <Button dark={false} onClick={handleModalClose}>
            გაუქმება
          </Button>
          <Button dark={true}>დაამატე თანამშრომელი</Button>
        </div>
      </div>
    </dialog>
  );
}

import { useEffect, useRef, useState } from "react";
import Cancel from "../../assets/cancel.svg";
import ModalInput from "./ModalInput";
import DepartmentSelect from "../DepartmentSelect";
import ModalImage from "./ModalImage";
import Button from "../Button";
import useCreateEmployee from "../../hooks/useCreateEmployee";
import useGetEmployees from "../../hooks/useGetEmployees";

export default function Modal({
  open,
  onModalClose,
  updateEmployees,
  updateRequired,
}) {
  const dialogRef = useRef();
  const [modalInfo, setModalInfo] = useState({
    name: "",
    surname: "",
    avatar: null,
    department_id: "",
  });
  const [modalError, setModalError] = useState({
    name: false,
    surname: false,
    avatar: false,
    department_id: false,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const { createEmployee } = useCreateEmployee();
  const { fetchData } = useGetEmployees();
  const imageRef = useRef();

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
      avatar: null,
      department_id: "",
    });
    setImageSrc(null);
    setModalError({
      name: false,
      surname: false,
      avatar: false,
      department_id: false,
    });
  }

  function handleValidation(key, value) {
    setModalError((prevValues) => ({ ...prevValues, [key]: value }));
  }

  function handleImgChange(event) {
    const file = event.target.files[0];
    if (file && file.size < 600000 && file.type.startsWith("image")) {
      console.log(file);
      handleModalChange("avatar", file);
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  }

  function handleClick() {
    imageSrc === null && imageRef.current.click();
  }

  function handleRemove() {
    setImageSrc(null);
    imageRef.current.value = "";
    handleModalChange("avatar", null);
  }

  async function handleCreateEmployee() {
    if (
      modalInfo.name === "" ||
      modalInfo.surname === "" ||
      modalInfo.avatar === null ||
      modalInfo.department_id === "" ||
      Object.values(modalError).includes(true)
    ) {
      modalInfo.name === "" && handleValidation("name", true);
      modalInfo.surname === "" && handleValidation("surname", true);
      modalInfo.avatar === null && handleValidation("avatar", true);
      modalInfo.department_id === "" && handleValidation("department_id", true);
      return;
    }

    const fd = new FormData();
    for (const key in modalInfo) {
      fd.append(key.toString(), modalInfo[key]);
      // console.log(key);
    }
    // console.log(fd.get("avatar"));

    try {
      await createEmployee(fd);
      if (updateRequired) {
        const response = await fetchData();
        updateEmployees(response);
      }
      handleModalClose();
    } catch (error) {
      console.error("Failed to create employee: ", error);
    }
  }

  // console.log(modalInfo);
  // console.log(modalError);

  return (
    <dialog
      ref={dialogRef}
      className="modal w-[913px] m-auto"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          handleModalClose();
        }
      }}
    >
      <div className="flex justify-end pb-[37px] px-[50px] pt-[40px]">
        <img
          src={Cancel}
          alt="cancel icon"
          onClick={handleModalClose}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col items-center gap-[45px] px-[50px] pb-[60px]">
        <h1 className="text-[32px] font-medium">თანამშრომლის დამატება</h1>
        <div className="w-full flex flex-row gap-[45px]">
          <ModalInput
            title="სახელი*"
            onChange={handleModalChange}
            inputName="name"
            inputValue={modalInfo.name}
            handleValidation={handleValidation}
            validation={modalError.name}
            open={open}
          />
          <ModalInput
            title="გვარი*"
            onChange={handleModalChange}
            inputName="surname"
            inputValue={modalInfo.surname}
            handleValidation={handleValidation}
            validation={modalError.surname}
            open={open}
          />
        </div>
        <ModalImage
          ref={imageRef}
          imageSrc={imageSrc}
          handleImgChange={handleImgChange}
          handleClick={handleClick}
          handleRemove={handleRemove}
          handleValidation={handleValidation}
          validation={modalError.avatar}
        />
        <DepartmentSelect
          depValue={modalInfo.department_id}
          handleChange={handleModalChange}
          handleValidation={handleValidation}
          validation={modalError.department_id}
        />
        <div className="w-full flex flex-row justify-end gap-[22px]">
          <Button dark={false} onClick={handleModalClose}>
            გაუქმება
          </Button>
          <Button dark={true} onClick={handleCreateEmployee}>
            დაამატე თანამშრომელი
          </Button>
        </div>
      </div>
    </dialog>
  );
}

import { forwardRef, useState } from "react";
import ImgUpload from "../../assets/img-upload.svg";
import RemoveIcon from "../../assets/remove-icon.svg";

const ModalImage = forwardRef(function ModalImage(
  {
    imageSrc,
    handleImgChange,
    handleClick,
    handleRemove,
    handleValidation,
    validation,
  },
  ref
) {
  const [avatarError, setAvatarError] = useState(false);

  function handleChange(e) {
    const file = e.target.files[0];
    const isInvalid =
      file && (file.size > 600000 || !file.type.startsWith("image"));
    setAvatarError(isInvalid);
    console.log(file);

    handleValidation("avatar", isInvalid);
    handleImgChange(e);
  }

  return (
    <div className="w-full">
      <p>ავატარი*</p>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => handleChange(e)}
      />
      <button
        className={`w-full border border-dashed ${
          validation ? "border-[#FA4D4D]" : "border-[#CED4DA]"
        } h-[120px] rounded-lg flex items-center justify-center hover:cursor-pointer`}
        onClick={handleClick}
      >
        {imageSrc !== null ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt="image"
              className="w-[88px] h-[88px] rounded-[100px]"
            />
            <img
              src={RemoveIcon}
              alt="remove icon"
              className="absolute top-[65px] left-[62px]"
              onClick={handleRemove}
            />
          </div>
        ) : (
          <img src={ImgUpload} alt="upload icon" />
        )}
      </button>
      {validation && avatarError && (
        <p className="text-xs font-light text-[#FA4D4D] mt-1">
          შეიყვანეთ ვალიდური მონაცემები (600kb ზომის სურათის ტიპი)
        </p>
      )}
    </div>
  );
});

export default ModalImage;

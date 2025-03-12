import { forwardRef, useRef, useState } from "react";
import ImgUpload from "../../assets/img-upload.svg";
import RemoveIcon from "../../assets/remove-icon.svg";

const ModalImage = forwardRef(function ModalImage(
  { imageSrc, handleImgChange, handleClick, handleRemove },
  ref
) {
  return (
    <div className="w-full">
      <p>ავატარი*</p>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => handleImgChange(e)}
      />
      <button
        className="w-full border border-dashed border-[#CED4DA] h-[120px] rounded-lg flex items-center justify-center hover:cursor-pointer"
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
    </div>
  );
});

export default ModalImage;

import React from "react";

interface Props {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

function FormField({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <label
          className="block font-sm font-medium text-green-900"
          htmlFor={name}
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
            onClick={handleSurpriseMe}
          >
            Surprise me
          </button>
        )}
        <input
          type={type}
          id={name}
          name={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 "
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}

export default FormField;

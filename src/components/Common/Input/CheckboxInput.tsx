import React from "react";

interface CInput {
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (checked: boolean) => void; // Modify onChange to accept boolean parameter
  label: string;
  checked: boolean; // Add checked prop
}

const CheckboxInput = ({ name, onChange, label, checked }: CInput) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (onChange) {
      onChange(isChecked); // Pass isChecked to onChange callback
    }
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        onChange={handleChange} // Call handleChange when checkbox state changes
        checked={checked} // Controlled by checked prop
        name={name}
        className="h-4 bg-gray-100 border-gray-300 rounded cursor-pointer"
      />
      <label
        dangerouslySetInnerHTML={{ __html: label }}
        className="ml-2 text-sm text-gray-900"
      ></label>
    </div>
  );
};

export default CheckboxInput;

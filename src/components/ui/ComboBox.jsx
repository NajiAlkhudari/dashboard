import { useState } from "react";

const ComboBox = ({ options = [], onSelect, placeholder, clearOnSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-slate-100 text-gray-950 dark:bg-background dark:text-white mt-1 block py-2 px-3 w-full sm:w-80 md:w-96 lg:w-128 rounded-md border-b-4 border-gray-200 focus:outline-none focus:border-sky-700 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border dark:bg-darkContent rounded-lg shadow-lg z-10">
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-background"
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                  onSelect(option.value);
                  if (clearOnSelect) {
                    setSelectedOption(null);
                  }
                }}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;

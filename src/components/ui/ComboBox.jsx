import { useState } from "react";

const ComboBox = ({ options = [], onSelect, placeholder, clearOnSelect }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className=" bg-slate-100 text-gray-950 dark:bg-background dark:text-white mt-1 block py-2 px-3 w-full sm:w-80 md:w-96 lg:w-128  rounded-md border-b-4   border-gray-200 focus:outline-none focus:border-sky-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-auto bg-white border dark:bg-darkContent  rounded-lg shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-background"
                onClick={() => {
                  setQuery(option.label); 
                  setIsOpen(false);
                  onSelect(option.value); 
                  if (clearOnSelect) {
                    setQuery("");
                  }
                }}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
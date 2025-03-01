import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";


const Table = ({ data, columns, onDelete , onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-2 text-left text-sm font-semibold text-gray-900 lg:text-lg">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-4 text-sm text-gray-950 md:py-4">
                  {column.key === 'action' ? (
                    <div className='space-x-2'>

<div className="relative group inline-block">

                 <button
                      className=" border border-gray-900 text-gray-900 px-1 py-1 rounded-md  "
                      onClick={() => onUpdate(row.id)} 
                    >
                      <FaRegEdit />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-sky-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Edit
                    </span>
                    </div>
                    <div className="relative group inline-block">
  <button
    className="border border-gray-900 text-gray-900 px-1 py-1 rounded-md "
    onClick={() => onDelete(row.id)}
  >
    <RiDeleteBin6Line />
  </button>
  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    Delete
  </span>
</div>

                    </div>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


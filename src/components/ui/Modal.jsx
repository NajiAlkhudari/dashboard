// import React from "react";
// import { MdClose } from "react-icons/md";

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-50">
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
//         <button
//           type="button"
//           className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//           onClick={onClose}
//         >
//           <MdClose size={24} />
//         </button>
        
//         <div className="p-5 sm:p-6 md:p-8">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
     
        <div className="flex items-center justify-between bg-sky-950 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            className="text-white hover:text-gray-200"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>
        
     
        <div className="p-5 sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
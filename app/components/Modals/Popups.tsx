import { FC, ReactNode } from "react";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Popup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-[1000] bg-opacity-20 bg-[#282828] backdrop-blur ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-opacity duration-500`}
      onClick={onClose} // Close on clicking outside the modal
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing the popup
      >
        <div 
          className="bg-white rounded-lg shadow-lg  max-h-[85vh] overflow-y-auto" 
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;

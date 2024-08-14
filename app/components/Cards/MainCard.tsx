import { FC, ReactNode } from "react";

type PopupProps = {
  title: string;
  children: ReactNode;
};

const MainCard: FC<PopupProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Card head */}
      <div className="py-3 px-4 rounded-t-lg bg-secondary-gradient text-primary-gray font-bold">
        <h2>{title}</h2>
      </div>
      {/* Card head */}

      {/* Card content */}
      {children}
      {/* Card content */}
    </div>
  );
};

export default MainCard;

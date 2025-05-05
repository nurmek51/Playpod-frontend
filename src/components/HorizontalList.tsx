
import React, { ReactNode } from "react";

interface HorizontalListProps {
  title: string;
  children: ReactNode[];
  viewAll?: ReactNode;
}

const HorizontalList: React.FC<HorizontalListProps> = ({ title, children, viewAll }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewAll && <div className="text-sm text-playpod-primary hover:underline">{viewAll}</div>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-visible">
        {children}
      </div>
    </div>
  );
};

export default HorizontalList;

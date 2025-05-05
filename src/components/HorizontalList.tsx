
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalListProps {
  title: string;
  children: React.ReactNode;
  viewAll?: string;
}

const HorizontalList: React.FC<HorizontalListProps> = ({
  title,
  children,
  viewAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    const scrollPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          {viewAll && (
            <a href={viewAll} className="text-sm text-playpod-primary hover:underline mr-4">
              View all
            </a>
          )}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x"
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalList;

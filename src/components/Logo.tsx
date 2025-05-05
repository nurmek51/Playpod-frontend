
import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC<{ size?: "small" | "medium" | "large" }> = ({ size = "medium" }) => {
  const navigate = useNavigate();
  
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-8 w-8",
    large: "h-10 w-10",
  };
  
  const textSizes = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  };

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onClick={() => navigate("/")}
    >
      <div className={`bg-playpod-primary rounded-md flex items-center justify-center ${sizeClasses[size]}`}>
        <div className="text-white font-bold">P</div>
      </div>
      <span className={`font-bold ${textSizes[size]}`}>PlayPod</span>
    </div>
  );
};

export default Logo;

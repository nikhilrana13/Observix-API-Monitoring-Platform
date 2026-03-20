import React from "react";

const ProjectCardShimmer = () => {
  return (
    <div className="relative bg-[#1A102C] border border-[#6a4dff]/20 rounded-2xl p-5 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-[#23104A] rounded-md"></div>
          <div className="h-3 w-20 bg-[#23104A] rounded-md"></div>
        </div>
        <div className="h-5 w-14 bg-[#23104A] rounded-md"></div>
      </div>
      {/* Base URL */}
      <div className="mb-3 space-y-2">
        <div className="h-3 w-20 bg-[#23104A] rounded-md"></div>
        <div className="h-3 w-full bg-[#23104A] rounded-md"></div>
      </div>
      {/* API Key */}
      <div className="mb-4 space-y-2">
        <div className="h-3 w-16 bg-[#23104A] rounded-md"></div>
        <div className="h-8 w-full bg-[#23104A] rounded-md"></div>
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between mb-3">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-[#23104A] rounded-md"></div>
          <div className="h-5 w-12 bg-[#23104A] rounded-md"></div>
        </div>
        <div className="h-10 w-10 bg-[#23104A] rounded-xl"></div>
      </div>
      {/* Last updated */}
      <div className="h-3 w-32 bg-[#23104A] rounded-md mb-4"></div>
      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="h-3 w-20 bg-[#23104A] rounded-md"></div>
        <div className="h-7 w-20 bg-[#23104A] rounded-md"></div>
      </div>
    </div>
  );
};

export default ProjectCardShimmer;
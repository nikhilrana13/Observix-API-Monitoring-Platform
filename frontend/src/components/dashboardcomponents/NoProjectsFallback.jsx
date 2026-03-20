import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const NoProjectsFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-[#6a4dff]/20 rounded-2xl bg-[#1A102C]">
  {/* Icon */}
  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#23104A] text-[#6a4dff] mb-4">
    <IoMdAdd size={23} />
  </div>
  {/* Title */}
  <h2 className="text-white text-lg font-semibold mb-2">
    No projects yet
  </h2>
  {/* Subtitle */}
  <p className="text-gray-400 text-sm max-w-sm mb-6">
    You haven't created any projects yet. Start monitoring your APIs by creating your first project.
  </p>
  {/* CTA Button */}
  <button className="bg-[#6a4dff] hover:bg-[#5b3df5] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300">
    + Create Your First Project
  </button>
</div>
  );
}

export default NoProjectsFallback;

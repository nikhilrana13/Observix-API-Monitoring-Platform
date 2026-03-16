import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-[#5b13ec1a]  bg-[#07050d] py-6 px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-[#cac3d9]/60">
          © 2026 Observix Inc. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#cac3d9]">
          <span className="hover:text-[#5b13ec] cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-[#5b13ec] cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-[#5b13ec] cursor-pointer">
            Cookie Policy
          </span>
          <span className="hover:text-[#5b13ec] cursor-pointer">
            Contact Support
          </span>
          <span className="hover:text-[#5b13ec] cursor-pointer">
            Status
          </span>
        </div>
      </footer>
  );
}

export default Footer;

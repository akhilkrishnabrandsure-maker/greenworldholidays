import React from 'react';

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
      <p className="text-gray-400">
        © {currentYear} Green World Holidays. All rights reserved. 
      </p>
      <p className="text-gray-700 mt-2 text-xs">
        Developed by <a href="https://www.linkedin.com/in/akhil-krishna-k-j-a33372317/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500 transition-colors"> : Akhil Krishna K J</a>
      </p>
    </div>
  );
}

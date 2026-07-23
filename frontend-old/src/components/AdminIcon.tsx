import React, { useState, useEffect } from 'react';
import { Crown, X } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

const AdminIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is admin
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (userToken && userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'admin') {
          setIsAdmin(true);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      setIsVisible(false);
      setIsAdmin(false);
    }
  }, []);

  if (!isVisible || !isAdmin) return null;

  return (
    <>
      {/* Floating Admin Icon */}
      <div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setShowDashboard(true)}
          className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <div className="relative">
            <Crown className="h-6 w-6" />
            
            {/* Admin Badge */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              A
            </div>
          </div>
          
          {/* Tooltip */}
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
              Admin Dashboard
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </button>
      </div>

      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Admin Dashboard</h2>
              <button 
                onClick={() => setShowDashboard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <AdminDashboard isOpen={showDashboard} onClose={() => setShowDashboard(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminIcon;
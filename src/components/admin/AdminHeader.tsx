
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut, Home } from 'lucide-react';

interface AdminHeaderProps {
  onSignOut: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onSignOut }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-food-primary">Trendy</span>
              <span className="text-food-dark">Food</span>
              <span className="text-food-primary"> Admin</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home size={18} />
                <span className="hidden sm:inline">View Site</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={onSignOut}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

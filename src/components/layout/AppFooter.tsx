
import { Home, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppFooter = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/",
      isActive: location.pathname === "/"
    },
    { 
      icon: Plus, 
      label: "New", 
      path: "/new",
      isActive: location.pathname === "/new"
    },
    { 
      icon: User, 
      label: "Profile", 
      path: "/profile",
      isActive: location.pathname === "/profile"
    },
  ];
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path} className="w-1/3 px-2">
              <Button 
                variant={item.isActive ? "default" : "ghost"} 
                className={cn(
                  "w-full flex flex-col items-center justify-center h-16 gap-1",
                  item.path === "/new" && "bg-packsmart-500 hover:bg-packsmart-600",
                  item.isActive && item.path !== "/new" && "bg-packsmart-100 text-packsmart-700"
                )}
              >
                <item.icon size={22} />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

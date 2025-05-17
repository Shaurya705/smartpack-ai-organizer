
import { ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const AppHeader = ({ title, showBackButton = false }: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {showBackButton && (
              <button 
                onClick={() => navigate(-1)}
                className="mr-2 p-2 rounded-full hover:bg-muted"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

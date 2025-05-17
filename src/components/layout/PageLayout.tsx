
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  hideFooter?: boolean;
}

const PageLayout = ({
  children,
  title,
  showBackButton = false,
  hideFooter = false,
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader title={title} showBackButton={showBackButton} />
      
      <main className="flex-1 container max-w-md mx-auto px-4 pb-24">
        {children}
      </main>
      
      {!hideFooter && <AppFooter />}
    </div>
  );
};

export default PageLayout;

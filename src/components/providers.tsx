import Preloader from "./preloader";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Preloader>
      <TooltipProvider>
        {children}
      </TooltipProvider>
      <Toaster />
    </Preloader>
  );
};

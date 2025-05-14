import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to maintain layout
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleTheme}  
        aria-label="Toggle theme"
        className={`relative overflow-hidden rounded-full transition-all duration-300 ${
          theme === "dark" 
            ? "bg-secondary hover:bg-secondary/80 border-border shadow-sm hover:shadow-md" 
            : "bg-gradient-to-br from-secondary to-secondary/90 hover:from-secondary/95 hover:to-secondary/80 border-primary/10 shadow-md hover:shadow-lg"
        }`}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {theme === "dark" ? (
            // Dark mode stars
            <>
              <motion.div 
                className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-70"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-60"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute top-2 right-2 w-0.5 h-0.5 bg-white rounded-full opacity-50"
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
            </>
          ) : (
            // Light mode sun rays
            <>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-yellow-200/20 to-orange-100/10 rounded-full"
                animate={{ 
                  rotate: 360
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </>
          )}
        </div>

        {/* Icon with animation */}
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="dark"
              initial={{ y: 20, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 30 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <Sun className="h-5 w-5 text-yellow-300" />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ y: 20, opacity: 0, rotate: 30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -30 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <Moon className="h-5 w-5 text-primary/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;

import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import "./styles/globals.css";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const ConsumerRights = lazy(() => import("./pages/ConsumerRights"));
const Community = lazy(() => import("./pages/Community"));
const Resources = lazy(() => import("./pages/Resources"));
const LegalDocumentsPage = lazy(() => import("./pages/LegalDocumentsPage"));
const ComplaintHub = lazy(() => import("./pages/ComplaintHub"));
const ComplaintForm = lazy(() => import("./pages/ComplaintForm"));
const ComplaintTracking = lazy(() => import("./pages/ComplaintTracking"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TestPage = lazy(() => import("./pages/TestPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <LanguageProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <div className="min-h-screen bg-background text-foreground">
                    <Toaster />
                    <Sonner />
                    <Suspense fallback={<LoadingFallback />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/rights" element={<ConsumerRights />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/documents" element={<LegalDocumentsPage />} />
                        <Route path="/complaints" element={<ComplaintHub />} />
                        <Route path="/complaint" element={<ComplaintForm />} />
                        <Route path="/tracking" element={<ComplaintTracking />} />
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </LanguageProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;

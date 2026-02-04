import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import AuthLanding from './features/auth/AuthLanding';
import ProfileSetupDialog from './features/auth/ProfileSetupDialog';
import AppLayout from './features/layout/AppLayout';
import DashboardView from './features/dashboard/DashboardView';
import DailyLogsView from './features/logging/DailyLogsView';
import ProgressView from './features/progress/ProgressView';
import RemindersView from './features/reminders/RemindersView';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

type View = 'dashboard' | 'logs' | 'progress' | 'reminders';

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    } else if (isAuthenticated && userProfile !== null) {
      setShowProfileSetup(false);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  useEffect(() => {
    const handleNavigateToLogs = () => {
      setCurrentView('logs');
    };
    window.addEventListener('navigate-to-logs', handleNavigateToLogs);
    return () => window.removeEventListener('navigate-to-logs', handleNavigateToLogs);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading Alex Health...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthLanding />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'logs':
        return <DailyLogsView />;
      case 'progress':
        return <ProgressView />;
      case 'reminders':
        return <RemindersView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <>
      <AppLayout currentView={currentView} onViewChange={setCurrentView}>
        {renderView()}
      </AppLayout>
      {showProfileSetup && <ProfileSetupDialog />}
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3, Bell, Calendar, LogOut, Heart } from 'lucide-react';
import DueRemindersBanner from '../reminders/DueRemindersBanner';

type View = 'dashboard' | 'logs' | 'progress' | 'reminders';

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function AppLayout({ children, currentView, onViewChange }: AppLayoutProps) {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const navItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: Activity },
    { id: 'logs' as View, label: 'Daily Logs', icon: Calendar },
    { id: 'progress' as View, label: 'Progress', icon: BarChart3 },
    { id: 'reminders' as View, label: 'Reminders', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/assets/generated/app-icon.dim_512x512.png" alt="Alex Health" className="h-10 w-10 rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Alex Health</h1>
                {userProfile && <p className="text-sm text-muted-foreground">Welcome, {userProfile.name}</p>}
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => onViewChange(item.id)}
                    className={`gap-2 transition-all ${isActive ? 'shadow-sm' : ''}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            <Button variant="outline" onClick={handleLogout} className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

          <nav className="md:hidden flex items-center gap-1 mt-4 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => onViewChange(item.id)}
                  size="sm"
                  className={`gap-2 whitespace-nowrap min-h-[44px] transition-all ${isActive ? 'shadow-sm' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </header>

      <DueRemindersBanner />

      <main className="container mx-auto px-4 py-8 max-w-7xl">{children}</main>

      <footer className="border-t border-border mt-20 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2026. Built with <Heart className="inline h-4 w-4 text-chart-4" /> using{' '}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useGetReminders } from '../../hooks/useQueries';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { isDueReminder } from './reminderUtils';

export default function DueRemindersBanner() {
  const { data: reminders = [] } = useGetReminders();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const dueReminders = reminders.filter((r) => r.isActive && isDueReminder(r) && !dismissed.has(r.id));

  useEffect(() => {
    // Clear dismissed reminders when new day starts
    const interval = setInterval(() => {
      setDismissed(new Set());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (dueReminders.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-2">
      {dueReminders.map((reminder) => (
        <Alert key={reminder.id} className="mb-2 border-chart-4 bg-chart-4/10">
          <Bell className="h-4 w-4 text-chart-4" />
          <AlertTitle className="flex items-center justify-between">
            <span>{reminder.title}</span>
            <Button variant="ghost" size="sm" onClick={() => setDismissed((prev) => new Set(prev).add(reminder.id))}>
              <X className="h-4 w-4" />
            </Button>
          </AlertTitle>
          <AlertDescription className="capitalize">Time for your {reminder.category} reminder!</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

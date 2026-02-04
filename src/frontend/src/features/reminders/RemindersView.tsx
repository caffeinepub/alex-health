import { useState } from 'react';
import { useGetReminders } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Bell } from 'lucide-react';
import RemindersList from './RemindersList';
import ReminderForm from './ReminderForm';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';

export default function RemindersView() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: reminders = [], isLoading } = useGetReminders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Habit Reminders</h2>
          <p className="text-muted-foreground mt-1 text-lg">Stay on track with your wellness goals</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          Add Reminder
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bell className="h-5 w-5 text-chart-4" />
            Your Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState rows={3} />
          ) : reminders.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No reminders set"
              description="Create reminders to build healthy habits and stay consistent with your wellness routine."
              actionLabel="Create Reminder"
              onAction={() => setIsFormOpen(true)}
            />
          ) : (
            <RemindersList reminders={reminders} />
          )}
        </CardContent>
      </Card>

      {isFormOpen && <ReminderForm editingReminder={null} onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

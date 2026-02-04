import { useState } from 'react';
import type { Reminder } from '../../backend';
import { useUpdateReminder, useDeleteReminder } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Clock } from 'lucide-react';
import ReminderForm from './ReminderForm';
import { toast } from 'sonner';

interface RemindersListProps {
  reminders: Reminder[];
}

export default function RemindersList({ reminders }: RemindersListProps) {
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const updateReminder = useUpdateReminder();
  const deleteReminder = useDeleteReminder();

  const handleToggle = async (reminder: Reminder) => {
    try {
      await updateReminder.mutateAsync({
        id: reminder.id,
        reminder: { ...reminder, isActive: !reminder.isActive },
      });
      toast.success(reminder.isActive ? 'Reminder disabled' : 'Reminder enabled');
    } catch (error) {
      toast.error('Failed to update reminder');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReminder.mutateAsync(id);
      toast.success('Reminder deleted');
    } catch (error) {
      toast.error('Failed to delete reminder');
    }
  };

  return (
    <>
      <div className="space-y-3">
        {reminders.map((reminder) => {
          const time = new Date(Number(reminder.scheduleTime / BigInt(1000000)));
          return (
            <div
              key={reminder.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{reminder.title}</h4>
                    <Badge variant="outline" className="capitalize">
                      {reminder.category}
                    </Badge>
                    {reminder.isActive && (
                      <Badge variant="default" className="bg-chart-1">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={reminder.isActive} onCheckedChange={() => handleToggle(reminder)} />
                  <Button variant="ghost" size="sm" onClick={() => setEditingReminder(reminder)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(reminder.id)}
                    disabled={deleteReminder.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {editingReminder && <ReminderForm editingReminder={editingReminder} onClose={() => setEditingReminder(null)} />}
    </>
  );
}

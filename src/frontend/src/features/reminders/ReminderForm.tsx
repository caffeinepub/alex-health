import { useState, useEffect } from 'react';
import type { Reminder } from '../../backend';
import { useAddReminder, useUpdateReminder } from '../../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ReminderFormProps {
  editingReminder: Reminder | null;
  onClose: () => void;
}

export default function ReminderForm({ editingReminder, onClose }: ReminderFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('exercise');
  const [time, setTime] = useState('09:00');

  const addReminder = useAddReminder();
  const updateReminder = useUpdateReminder();

  useEffect(() => {
    if (editingReminder) {
      setTitle(editingReminder.title);
      setCategory(editingReminder.category);
      const date = new Date(Number(editingReminder.scheduleTime / BigInt(1000000)));
      setTime(date.toTimeString().slice(0, 5));
    }
  }, [editingReminder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date();
    scheduleDate.setHours(hours, minutes, 0, 0);

    const reminder: Reminder = {
      id: editingReminder?.id || `reminder-${Date.now()}`,
      title: title.trim(),
      category,
      scheduleTime: BigInt(scheduleDate.getTime()) * BigInt(1000000),
      isActive: editingReminder?.isActive ?? true,
    };

    try {
      if (editingReminder) {
        await updateReminder.mutateAsync({ id: editingReminder.id, reminder });
        toast.success('Reminder updated');
      } else {
        await addReminder.mutateAsync(reminder);
        toast.success('Reminder created');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save reminder');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingReminder ? 'Edit Reminder' : 'Create Reminder'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Morning workout"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="meals">Meals</SelectItem>
                <SelectItem value="hydration">Hydration</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addReminder.isPending || updateReminder.isPending}>
              {addReminder.isPending || updateReminder.isPending ? 'Saving...' : editingReminder ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

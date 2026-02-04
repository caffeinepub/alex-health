import { useState, useEffect } from 'react';
import type { WellnessLog } from '../../backend';
import { useAddWellnessLog, useUpdateWellnessLog } from '../../hooks/useQueries';
import { dateToTime } from '../dates/dateUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WellnessLogFormProps {
  category: string;
  selectedDate: Date;
  editingLog: WellnessLog | null;
  onClose: () => void;
}

const categoryLabels: Record<string, { title: string; placeholder: string }> = {
  meals: {
    title: 'Meal Entry',
    placeholder: 'e.g., Breakfast: Oatmeal with berries and almonds',
  },
  hydration: {
    title: 'Hydration Entry',
    placeholder: 'e.g., 500ml water, 1 cup green tea',
  },
  sleep: {
    title: 'Sleep Entry',
    placeholder: 'e.g., 7.5 hours, felt refreshed',
  },
  activities: {
    title: 'Activity Entry',
    placeholder: 'e.g., Walked 8,000 steps, took stairs at work',
  },
};

export default function WellnessLogForm({ category, selectedDate, editingLog, onClose }: WellnessLogFormProps) {
  const [details, setDetails] = useState('');
  const addLog = useAddWellnessLog();
  const updateLog = useUpdateWellnessLog();

  const config = categoryLabels[category] || { title: 'Log Entry', placeholder: 'Enter details...' };

  useEffect(() => {
    if (editingLog) {
      setDetails(editingLog.details);
    }
  }, [editingLog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!details.trim()) {
      toast.error('Please enter some details');
      return;
    }

    const log: WellnessLog = {
      id: editingLog?.id || `${category}-${Date.now()}`,
      date: dateToTime(selectedDate),
      category,
      details: details.trim(),
    };

    try {
      if (editingLog) {
        await updateLog.mutateAsync({ id: editingLog.id, log });
        toast.success('Entry updated');
      } else {
        await addLog.mutateAsync(log);
        toast.success('Entry logged');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save entry');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingLog ? `Edit ${config.title}` : `Add ${config.title}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              placeholder={config.placeholder}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addLog.isPending || updateLog.isPending}>
              {addLog.isPending || updateLog.isPending ? 'Saving...' : editingLog ? 'Update' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

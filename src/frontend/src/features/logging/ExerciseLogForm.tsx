import { useState, useEffect } from 'react';
import type { ExerciseLog } from '../../backend';
import { useAddExerciseLog, useUpdateExerciseLog } from '../../hooks/useQueries';
import { dateToTime } from '../dates/dateUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ExerciseLogFormProps {
  selectedDate: Date;
  editingLog: ExerciseLog | null;
  onClose: () => void;
}

export default function ExerciseLogForm({ selectedDate, editingLog, onClose }: ExerciseLogFormProps) {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState<string>('moderate');
  const [notes, setNotes] = useState('');

  const addLog = useAddExerciseLog();
  const updateLog = useUpdateExerciseLog();

  useEffect(() => {
    if (editingLog) {
      setWorkoutType(editingLog.workoutType);
      setDuration(editingLog.durationMinutes.toString());
      setIntensity(editingLog.intensity);
      setNotes(editingLog.notes);
    }
  }, [editingLog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutType.trim() || !duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      toast.error('Please enter a valid duration');
      return;
    }

    const log: ExerciseLog = {
      id: editingLog?.id || `exercise-${Date.now()}`,
      date: dateToTime(selectedDate),
      workoutType: workoutType.trim(),
      durationMinutes: BigInt(durationNum),
      intensity,
      notes: notes.trim(),
    };

    try {
      if (editingLog) {
        await updateLog.mutateAsync({ id: editingLog.id, log });
        toast.success('Workout updated');
      } else {
        await addLog.mutateAsync(log);
        toast.success('Workout logged');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save workout');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingLog ? 'Edit Workout' : 'Log Workout'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workoutType">Workout Type *</Label>
            <Input
              id="workoutType"
              placeholder="e.g., Running, Yoga, Weightlifting"
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes) *</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity</Label>
            <Select value={intensity} onValueChange={setIntensity}>
              <SelectTrigger id="intensity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="intense">Intense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="How did it feel? Any achievements?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addLog.isPending || updateLog.isPending}>
              {addLog.isPending || updateLog.isPending ? 'Saving...' : editingLog ? 'Update' : 'Log Workout'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

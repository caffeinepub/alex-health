import { useState } from 'react';
import { useDeleteExerciseLog } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Activity } from 'lucide-react';
import ExerciseLogForm from './ExerciseLogForm';
import type { ExerciseLog } from '../../backend';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';

interface ExerciseLogSectionProps {
  logs: ExerciseLog[];
  selectedDate: Date;
  isLoading?: boolean;
}

export default function ExerciseLogSection({ logs, selectedDate, isLoading }: ExerciseLogSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<ExerciseLog | null>(null);
  const deleteLog = useDeleteExerciseLog();

  const handleEdit = (log: ExerciseLog) => {
    setEditingLog(log);
    setIsFormOpen(true);
  };

  const handleDelete = async (logId: string) => {
    if (confirm('Are you sure you want to delete this exercise log?')) {
      await deleteLog.mutateAsync(logId);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLog(null);
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-5 w-5 text-chart-1" />
            Exercise
          </CardTitle>
          <Button onClick={() => setIsFormOpen(true)} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Workout</span>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState rows={2} />
          ) : logs.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No workouts logged"
              description="Start tracking your exercise to see your fitness progress over time."
              actionLabel="Log Workout"
              onAction={() => setIsFormOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{log.workoutType}</p>
                        <Badge variant="outline" className="capitalize">
                          {log.intensity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {Number(log.durationMinutes)} minutes
                      </p>
                      {log.notes && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{log.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(log)} className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(log.id)}
                        disabled={deleteLog.isPending}
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isFormOpen && <ExerciseLogForm editingLog={editingLog} selectedDate={selectedDate} onClose={handleCloseForm} />}
    </>
  );
}

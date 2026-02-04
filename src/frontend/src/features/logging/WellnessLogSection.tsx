import { useState } from 'react';
import { useDeleteWellnessLog } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, LucideIcon } from 'lucide-react';
import WellnessLogForm from './WellnessLogForm';
import type { WellnessLog } from '../../backend';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';

interface WellnessLogSectionProps {
  category: string;
  logs: WellnessLog[];
  selectedDate: Date;
  icon: LucideIcon;
  title: string;
  emptyMessage: string;
  isLoading?: boolean;
}

export default function WellnessLogSection({
  category,
  logs,
  selectedDate,
  icon: Icon,
  title,
  emptyMessage,
  isLoading,
}: WellnessLogSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<WellnessLog | null>(null);
  const deleteLog = useDeleteWellnessLog();

  const handleEdit = (log: WellnessLog) => {
    setEditingLog(log);
    setIsFormOpen(true);
  };

  const handleDelete = async (logId: string) => {
    if (confirm(`Are you sure you want to delete this ${category} log?`)) {
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
            <Icon className="h-5 w-5 text-chart-2" />
            {title}
          </CardTitle>
          <Button onClick={() => setIsFormOpen(true)} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Entry</span>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState rows={2} />
          ) : logs.length === 0 ? (
            <EmptyState
              icon={Icon}
              title={emptyMessage}
              description={`Track your ${category} to maintain a complete wellness record.`}
              actionLabel="Add Entry"
              onAction={() => setIsFormOpen(true)}
            />
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-foreground flex-1 min-w-0">{log.details}</p>
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

      {isFormOpen && (
        <WellnessLogForm category={category} editingLog={editingLog} selectedDate={selectedDate} onClose={handleCloseForm} />
      )}
    </>
  );
}

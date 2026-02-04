import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ExerciseLog } from '../../backend';
import EmptyState from '@/components/EmptyState';
import { TrendingUp } from 'lucide-react';

interface ExerciseChartProps {
  logs: ExerciseLog[];
  range: 7 | 30;
}

interface ChartDataPoint {
  date: string;
  minutes: number;
}

export default function ExerciseChart({ logs, range }: ExerciseChartProps) {
  const chartData = useMemo(() => {
    const today = new Date();
    const data: ChartDataPoint[] = [];

    for (let i = range - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayStart = BigInt(date.getTime()) * BigInt(1000000);
      const dayEnd = dayStart + BigInt(86400000000000);

      const dayLogs = logs.filter((log) => log.date >= dayStart && log.date < dayEnd);
      const totalMinutes = dayLogs.reduce((sum, log) => sum + Number(log.durationMinutes), 0);

      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes: totalMinutes,
      });
    }

    return data;
  }, [logs, range]);

  const hasData = chartData.some((d) => d.minutes > 0);

  if (!hasData) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="No exercise data for this period"
        description="Start logging your workouts to see your progress visualized here."
      />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'oklch(var(--card))',
            border: '1px solid oklch(var(--border))',
            borderRadius: '0.5rem',
            color: 'oklch(var(--foreground))',
          }}
        />
        <Bar dataKey="minutes" fill="oklch(var(--chart-1))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

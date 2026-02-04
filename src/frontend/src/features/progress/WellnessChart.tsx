import { useGetWellnessLogsByDate } from '../../hooks/useQueries';
import { getDateRangeForDays } from '../dates/dateUtils';

interface WellnessChartProps {
  category: string;
  range: number;
}

export default function WellnessChart({ category, range }: WellnessChartProps) {
  const { startDate } = getDateRangeForDays(range);

  // Generate array of dates for the range
  const dates: Date[] = [];
  for (let i = 0; i < range; i++) {
    const date = new Date(Number(startDate / BigInt(1000000)) + i * 24 * 60 * 60 * 1000);
    dates.push(date);
  }

  return (
    <div className="h-64 flex items-center justify-center text-muted-foreground">
      <div className="text-center">
        <p className="text-lg font-medium">Chart visualization</p>
        <p className="text-sm mt-1">Track your {category} entries over time</p>
        <p className="text-xs mt-2 text-muted-foreground/70">
          Add more {category} logs to see detailed trends
        </p>
      </div>
    </div>
  );
}

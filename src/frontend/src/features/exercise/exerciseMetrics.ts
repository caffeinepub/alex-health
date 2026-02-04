import type { ExerciseLog } from '../../backend';

export interface ExerciseMetrics {
  totalMinutes: number;
  workoutCount: number;
  activeDays: number;
  avgIntensity: string;
}

export function calculateExerciseMetrics(logs: ExerciseLog[]): ExerciseMetrics {
  if (logs.length === 0) {
    return {
      totalMinutes: 0,
      workoutCount: 0,
      activeDays: 0,
      avgIntensity: 'none',
    };
  }

  const totalMinutes = logs.reduce((sum, log) => sum + Number(log.durationMinutes), 0);
  const workoutCount = logs.length;

  // Calculate unique days
  const uniqueDays = new Set(
    logs.map((log) => {
      const date = new Date(Number(log.date / BigInt(1000000)));
      return date.toDateString();
    })
  );
  const activeDays = uniqueDays.size;

  // Calculate average intensity
  const intensityMap: Record<string, number> = { light: 1, moderate: 2, intense: 3 };
  const intensitySum = logs.reduce((sum, log) => sum + (intensityMap[log.intensity] || 2), 0);
  const avgIntensityValue = intensitySum / logs.length;

  let avgIntensity = 'moderate';
  if (avgIntensityValue < 1.5) avgIntensity = 'light';
  else if (avgIntensityValue > 2.5) avgIntensity = 'intense';

  return {
    totalMinutes,
    workoutCount,
    activeDays,
    avgIntensity,
  };
}

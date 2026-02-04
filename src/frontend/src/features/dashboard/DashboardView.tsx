import { useGetExerciseLogsByDateRange } from '../../hooks/useQueries';
import { getDateRangeForDays, getTodayStart } from '../dates/dateUtils';
import { calculateExerciseMetrics } from '../exercise/exerciseMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Calendar, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';

export default function DashboardView() {
  const { startDate, endDate } = getDateRangeForDays(7);
  const { data: exerciseLogs = [], isLoading } = useGetExerciseLogsByDateRange(startDate, endDate);
  const metrics = calculateExerciseMetrics(exerciseLogs);

  const today = getTodayStart();
  const todayLogs = exerciseLogs.filter((log) => log.date >= today && log.date < today + BigInt(86400000000000));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Your Fitness Dashboard</h2>
        <p className="text-muted-foreground text-lg">Track your progress and stay motivated</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-chart-1/20 bg-gradient-to-br from-card to-chart-1/5 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Minutes</CardTitle>
            <Activity className="h-5 w-5 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{metrics.totalMinutes}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="border-chart-2/20 bg-gradient-to-br from-card to-chart-2/5 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Workouts</CardTitle>
            <Calendar className="h-5 w-5 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{metrics.workoutCount}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="border-chart-3/20 bg-gradient-to-br from-card to-chart-3/5 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Days</CardTitle>
            <TrendingUp className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{metrics.activeDays}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 7 days</p>
          </CardContent>
        </Card>

        <Card className="border-chart-4/20 bg-gradient-to-br from-card to-chart-4/5 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Intensity</CardTitle>
            <Zap className="h-5 w-5 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground capitalize">{metrics.avgIntensity}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Today's Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState rows={2} />
          ) : todayLogs.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No workouts logged today"
              description="Ready to get moving? Head to Daily Logs to record your first workout of the day."
              actionLabel="Go to Daily Logs"
              onAction={() => {
                const event = new CustomEvent('navigate-to-logs');
                window.dispatchEvent(event);
              }}
            />
          ) : (
            <div className="space-y-3">
              {todayLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                  <div>
                    <p className="font-semibold text-foreground">{log.workoutType}</p>
                    <p className="text-sm text-muted-foreground">
                      {Number(log.durationMinutes)} min • {log.intensity}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {log.intensity}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState rows={3} />
          ) : exerciseLogs.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              title="No exercise data yet"
              description="Start logging your workouts to see your progress and build momentum. Every journey begins with a single step!"
              actionLabel="Log Your First Workout"
              onAction={() => {
                const event = new CustomEvent('navigate-to-logs');
                window.dispatchEvent(event);
              }}
            />
          ) : (
            <div className="space-y-3">
              {exerciseLogs.slice(0, 5).map((log) => {
                const date = new Date(Number(log.date / BigInt(1000000)));
                return (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{log.workoutType}</p>
                      <p className="text-sm text-muted-foreground">
                        {date.toLocaleDateString()} • {Number(log.durationMinutes)} min
                      </p>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {log.intensity}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useGetExerciseLogsByDateRange } from '../../hooks/useQueries';
import { getDateRangeForDays } from '../dates/dateUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ExerciseChart from './ExerciseChart';
import WellnessChart from './WellnessChart';
import LoadingState from '@/components/LoadingState';

export default function ProgressView() {
  const [range, setRange] = useState<7 | 30>(7);
  const { startDate, endDate } = getDateRangeForDays(range);
  const { data: exerciseLogs = [], isLoading } = useGetExerciseLogsByDateRange(startDate, endDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Progress Tracking</h2>
          <p className="text-muted-foreground mt-1 text-lg">Visualize your wellness journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant={range === 7 ? 'default' : 'outline'} onClick={() => setRange(7)} size="sm" className="shadow-sm">
            7 Days
          </Button>
          <Button variant={range === 30 ? 'default' : 'outline'} onClick={() => setRange(30)} size="sm" className="shadow-sm">
            30 Days
          </Button>
        </div>
      </div>

      <Tabs defaultValue="exercise" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="hydration">Hydration</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>

        <TabsContent value="exercise" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Exercise Duration (minutes)</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <LoadingState rows={4} className="py-8" />
              ) : (
                <ExerciseChart logs={exerciseLogs} range={range} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hydration" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Daily Hydration</CardTitle>
            </CardHeader>
            <CardContent>
              <WellnessChart category="hydration" range={range} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sleep Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <WellnessChart category="sleep" range={range} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

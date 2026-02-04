import { useState } from 'react';
import { useGetWellnessLogsByDate, useGetExerciseLogsByDateRange } from '../../hooks/useQueries';
import { getTodayStart, dateToTime } from '../dates/dateUtils';
import DatePickerControl from '../dates/DatePickerControl';
import ExerciseLogSection from './ExerciseLogSection';
import WellnessLogSection from './WellnessLogSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Droplet, Moon, Utensils, Footprints } from 'lucide-react';

export default function DailyLogsView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateTime = dateToTime(selectedDate);
  const startOfDay = BigInt(new Date(selectedDate).setHours(0, 0, 0, 0)) * BigInt(1000000);
  const endOfDay = startOfDay + BigInt(86400000000000);

  const { data: wellnessLogs = [], isLoading: wellnessLoading } = useGetWellnessLogsByDate(dateTime);
  const { data: exerciseLogs = [], isLoading: exerciseLoading } = useGetExerciseLogsByDateRange(startOfDay, endOfDay);

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Daily Logs</h2>
          <p className="text-muted-foreground mt-1 text-lg">
            {isToday ? 'Today' : selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <DatePickerControl selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>

      <Tabs defaultValue="exercise" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="exercise" className="gap-2 py-3">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Exercise</span>
          </TabsTrigger>
          <TabsTrigger value="meals" className="gap-2 py-3">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Meals</span>
          </TabsTrigger>
          <TabsTrigger value="hydration" className="gap-2 py-3">
            <Droplet className="h-4 w-4" />
            <span className="hidden sm:inline">Water</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="gap-2 py-3">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Sleep</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="gap-2 py-3">
            <Footprints className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exercise" className="mt-6">
          <ExerciseLogSection logs={exerciseLogs} selectedDate={selectedDate} isLoading={exerciseLoading} />
        </TabsContent>

        <TabsContent value="meals" className="mt-6">
          <WellnessLogSection
            category="meals"
            logs={wellnessLogs.filter((log) => log.category === 'meals')}
            selectedDate={selectedDate}
            icon={Utensils}
            title="Meals"
            emptyMessage="No meals logged for this day"
            isLoading={wellnessLoading}
          />
        </TabsContent>

        <TabsContent value="hydration" className="mt-6">
          <WellnessLogSection
            category="hydration"
            logs={wellnessLogs.filter((log) => log.category === 'hydration')}
            selectedDate={selectedDate}
            icon={Droplet}
            title="Hydration"
            emptyMessage="No hydration logged for this day"
            isLoading={wellnessLoading}
          />
        </TabsContent>

        <TabsContent value="sleep" className="mt-6">
          <WellnessLogSection
            category="sleep"
            logs={wellnessLogs.filter((log) => log.category === 'sleep')}
            selectedDate={selectedDate}
            icon={Moon}
            title="Sleep"
            emptyMessage="No sleep logged for this day"
            isLoading={wellnessLoading}
          />
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <WellnessLogSection
            category="activities"
            logs={wellnessLogs.filter((log) => log.category === 'activities')}
            selectedDate={selectedDate}
            icon={Footprints}
            title="Activities"
            emptyMessage="No activities logged for this day"
            isLoading={wellnessLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

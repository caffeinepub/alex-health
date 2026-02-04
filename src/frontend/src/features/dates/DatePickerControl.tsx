import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface DatePickerControlProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePickerControl({ selectedDate, onDateChange }: DatePickerControlProps) {
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="flex items-center gap-2">
      {!isToday && (
        <Button variant="outline" onClick={() => onDateChange(new Date())} size="sm">
          Today
        </Button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && onDateChange(date)} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

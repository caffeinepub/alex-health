import type { Reminder } from '../../backend';

export function isDueReminder(reminder: Reminder): boolean {
  const now = new Date();
  const reminderTime = new Date(Number(reminder.scheduleTime / BigInt(1000000)));

  // Check if reminder time is within the last 30 minutes
  const timeDiff = now.getTime() - reminderTime.getTime();
  const thirtyMinutes = 30 * 60 * 1000;

  // Due if scheduled time is in the past 30 minutes and today
  return (
    timeDiff >= 0 &&
    timeDiff <= thirtyMinutes &&
    now.toDateString() === reminderTime.toDateString()
  );
}

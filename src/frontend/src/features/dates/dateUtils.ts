export function getTodayStart(): bigint {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return BigInt(today.getTime()) * BigInt(1000000);
}

export function dateToTime(date: Date): bigint {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return BigInt(d.getTime()) * BigInt(1000000);
}

export function timeToDate(time: bigint): Date {
  return new Date(Number(time / BigInt(1000000)));
}

export function getDateRangeForDays(days: number): { startDate: bigint; endDate: bigint } {
  const now = new Date();
  const endDate = BigInt(now.getTime()) * BigInt(1000000);
  const startDate = BigInt(now.getTime() - days * 24 * 60 * 60 * 1000) * BigInt(1000000);
  return { startDate, endDate };
}

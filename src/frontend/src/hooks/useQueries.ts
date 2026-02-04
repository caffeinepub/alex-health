import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Reminder, WellnessLog, ExerciseLog } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Reminders Queries
export function useGetReminders() {
  const { actor, isFetching } = useActor();

  return useQuery<Reminder[]>({
    queryKey: ['reminders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReminders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReminder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reminder: Reminder) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReminder(reminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
}

export function useUpdateReminder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reminder }: { id: string; reminder: Reminder }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateReminder(id, reminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
}

export function useDeleteReminder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteReminder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
}

// Wellness Logs Queries
export function useGetWellnessLogsByDate(date: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<WellnessLog[]>({
    queryKey: ['wellnessLogs', date.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWellnessLogsByDate(date);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWellnessLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: WellnessLog) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWellnessLog(log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wellnessLogs'] });
    },
  });
}

export function useUpdateWellnessLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, log }: { id: string; log: WellnessLog }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateWellnessLog(id, log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wellnessLogs'] });
    },
  });
}

export function useDeleteWellnessLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteWellnessLog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wellnessLogs'] });
    },
  });
}

// Exercise Logs Queries
export function useGetExerciseLogsByDateRange(startDate: bigint, endDate: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<ExerciseLog[]>({
    queryKey: ['exerciseLogs', startDate.toString(), endDate.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExerciseLogsByDateRange(startDate, endDate);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddExerciseLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: ExerciseLog) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addExerciseLog(log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exerciseLogs'] });
      queryClient.invalidateQueries({ queryKey: ['wellnessLogs'] });
    },
  });
}

export function useUpdateExerciseLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, log }: { id: string; log: ExerciseLog }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateExerciseLog(id, log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exerciseLogs'] });
    },
  });
}

export function useDeleteExerciseLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteExerciseLog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exerciseLogs'] });
    },
  });
}

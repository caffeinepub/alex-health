import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Reminder {
    id: string;
    title: string;
    isActive: boolean;
    scheduleTime: Time;
    category: string;
}
export interface WellnessLog {
    id: string;
    date: Time;
    details: string;
    category: string;
}
export interface UserProfile {
    name: string;
    preferences: string;
    goals: string;
}
export interface ExerciseLog {
    id: string;
    date: Time;
    durationMinutes: bigint;
    notes: string;
    workoutType: string;
    intensity: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addExerciseLog(log: ExerciseLog): Promise<void>;
    addReminder(reminder: Reminder): Promise<void>;
    addWellnessLog(log: WellnessLog): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteExerciseLog(logId: string): Promise<void>;
    deleteReminder(reminderId: string): Promise<void>;
    deleteWellnessLog(logId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getExerciseLogsByDateRange(startDate: Time, endDate: Time): Promise<Array<ExerciseLog>>;
    getReminders(): Promise<Array<Reminder>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWellnessLogsByDate(date: Time): Promise<Array<WellnessLog>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateExerciseLog(logId: string, updatedLog: ExerciseLog): Promise<void>;
    updateReminder(reminderId: string, updatedReminder: Reminder): Promise<void>;
    updateWellnessLog(logId: string, updatedLog: WellnessLog): Promise<void>;
}

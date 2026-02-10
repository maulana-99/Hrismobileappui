/**
 * Database Types for Shift Management
 * Based on tables: shifts, employee_shifts, shift_schedules
 */

// ============================================
// Table: shifts
// Master data for shift definitions
// ============================================
export interface Shift {
    id: number;
    name: string;           // varchar(50) NN - "Shift Pagi", "Shift Siang", etc.
    code: string | null;    // varchar(20) - "PAGI", "SIANG", "MALAM"
    description: string | null; // text
    is_active: boolean;     // boolean
    created_at: string;     // timestamptz
}

// ============================================
// Table: employee_shifts
// Links employees to their assigned shifts
// ============================================
export interface EmployeeShift {
    id: number;
    employee_id: number;    // int NN FK -> employees
    shift_id: number;       // int NN FK -> shifts
    effective_from: string; // date NN - When this assignment starts
    effective_to: string | null; // date - When this assignment ends (null = ongoing)
    created_at: string;     // timestamptz
}

// ============================================
// Table: shift_schedules
// Defines the schedule for each shift by day of week
// ============================================
export interface ShiftSchedule {
    id: number;
    shift_id: number;       // int NN FK -> shifts
    day_of_week: number;    // int NN - 0=Sunday, 1=Monday, ..., 6=Saturday (or 1-7)
    start_time: string;     // time NN - "08:00:00"
    end_time: string;       // time NN - "16:00:00"
    is_working_day: boolean; // boolean - true if working, false if off
}

// ============================================
// Enums & Constants
// ============================================
export enum DayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
}

export const DAY_NAMES_ID: Record<number, string> = {
    0: 'Min',
    1: 'Sen',
    2: 'Sel',
    3: 'Rab',
    4: 'Kam',
    5: 'Jum',
    6: 'Sab',
};

export const DAY_NAMES_FULL_ID: Record<number, string> = {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu',
};

// ============================================
// Joined / Computed Types for UI
// ============================================

/**
 * Complete shift data with schedule - joined from shifts + shift_schedules
 */
export interface ShiftWithSchedule extends Shift {
    schedules: ShiftSchedule[];
}

/**
 * Employee's assigned shift with full details
 * Joined from employee_shifts + shifts + shift_schedules
 */
export interface EmployeeShiftDetail {
    assignment: EmployeeShift;
    shift: Shift;
    todaySchedule: ShiftSchedule | null;
    weekSchedules: ShiftSchedule[];
}

/**
 * UI-friendly representation of a day in weekly schedule
 */
export interface WeeklyShiftDay {
    dayOfWeek: number;       // 0-6
    dayName: string;         // "Sen", "Sel", etc.
    date: number;            // 1-31
    fullDate: Date;          // Full date object
    shiftName: string;       // "Pagi", "Siang", "Malam", "Libur"
    shiftType: 'morning' | 'afternoon' | 'night' | 'off';
    startTime: string | null; // "08:00"
    endTime: string | null;   // "16:00"
    isWorkingDay: boolean;
    isToday: boolean;
}

/**
 * Current shift status for display
 */
export interface CurrentShiftStatus {
    shift: Shift;
    schedule: ShiftSchedule;
    status: 'active' | 'upcoming' | 'completed' | 'off';
    shiftType: 'morning' | 'afternoon' | 'night';
}

// ============================================
// Helper Functions
// ============================================

/**
 * Determine shift type based on start time
 */
export function getShiftType(startTime: string): 'morning' | 'afternoon' | 'night' {
    const hour = parseInt(startTime.split(':')[0], 10);
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'night';
}

/**
 * Format time from "HH:MM:SS" to "HH:MM"
 */
export function formatTime(time: string | null): string {
    if (!time) return '-';
    return time.substring(0, 5);
}

/**
 * Get schedule for a specific day of week
 */
export function getScheduleForDay(
    schedules: ShiftSchedule[],
    dayOfWeek: number
): ShiftSchedule | undefined {
    return schedules.find(s => s.day_of_week === dayOfWeek);
}

export function isShiftActive(schedule: ShiftSchedule): boolean {
    if (!schedule.is_working_day) return false;

    const now = new Date();
    const [startH, startM, startS] = schedule.start_time.split(':').map(Number);
    const [endH, endM, endS] = schedule.end_time.split(':').map(Number);

    const startTime = new Date(now);
    startTime.setHours(startH, startM, startS || 0, 0);

    let endTime = new Date(now);
    endTime.setHours(endH, endM, endS || 0, 0);

    // Handle cross-day (night shift)
    if (endTime < startTime) {
        // If current time is after start time or before end time
        const midnight = new Date(now);
        midnight.setHours(0, 0, 0, 0);
        const nextMidnight = new Date(now);
        nextMidnight.setDate(nextMidnight.getDate() + 1);
        nextMidnight.setHours(0, 0, 0, 0);

        if (now >= startTime) {
            // We are between start time and midnight
            return true;
        } else if (now <= endTime) {
            // We are between midnight and end time
            return true;
        }
        return false;
    }

    return now >= startTime && now <= endTime;
}

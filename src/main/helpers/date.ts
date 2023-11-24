import { format, differenceInHours as diffInHours } from 'date-fns';

export function formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy HH:mm');
}

export function differenceInHours(dateOne: Date, dateTwo: Date): number {
    return diffInHours(dateTwo, dateOne)
}
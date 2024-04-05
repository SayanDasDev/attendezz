import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const app_url = "http://localhost:3000"
export const backend_url = "http://localhost:8080"


export function getAccessToken(): string {
  const access_token = Cookies.get("access_token");
    if (!access_token) {
      throw new Error(`You haven't registered yet.`);
    }
  return access_token;
}

export function getFirstLetter(str: string): string {
  const ignoreWords = ["Dr.", "Mr.", "Mrs.", "Kumar", "Prof.", "Sri"].map(word => word.toLowerCase());
  let words = str.split(' ').filter(word => !ignoreWords.includes(word.toLowerCase()));
        return words.length > 0 ? words[0].charAt(0).toUpperCase() : '';
}


export function getShortName(str1: string, str2: string): string {
  return `${getFirstLetter(str1)}${getFirstLetter(str2)}`;
}


export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function formatPhNumber(num: string) {
  if (num.length > 10) {
    return '+' + num.slice(0, -10) + '-' + num.slice(-10);
  }
  return num;
}

export function getCurrentDay(): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return today.getDay() === 0 ? "" : days[today.getDay()].toUpperCase();
}

export function convertTo12Hour(timeStr:string) {
  const date = new Date();
  date.setHours(parseInt(timeStr.split(':')[0]));
  date.setMinutes(parseInt(timeStr.split(':')[1]));
  date.setSeconds(parseInt(timeStr.split(':')[2]));

  let hours = date.getHours();
  hours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours); // Corrected this line
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${ampm}`;
}


export function timeToString(time: {hour: number, minute: number}): string {
  return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
}

export function generateEndTime(startTime: string, duration: number): string {
  const [startHour, startMinute] = startTime.split(':').map(Number);

  const durationHours = Math.floor(duration);
  const durationMinutes = (duration - durationHours) * 60;

  let endHour = startHour + durationHours;
  let endMinute = startMinute + durationMinutes;

  if (endMinute >= 60) {
    endMinute -= 60;
    endHour += 1;
  }

  if (endHour >= 24) {
    endHour -= 24;
  }

  const endTime = `${endHour.toString().padStart(2, '0')}:${Math.round(endMinute).toString().padStart(2, '0')}`;

  return endTime;
}
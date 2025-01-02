import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (date: Date) => {
  return new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', ' at')
}

export const formatTimeDifference = (date: Date | string) => {
  const now = new Date();
  const commentDate = new Date(date);
  const diffInMilliseconds = now.getTime() - commentDate.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;
  if (diffInWeeks < 4) return `${diffInWeeks}w`;
  if (diffInMonths < 12) return `${diffInMonths}mo`;
  return `${diffInYears}y`;
}


// utils.ts
export function formatMessageTime(localTime: Date | string): string {
  const date = new Date(localTime);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", localTime);
    return "Invalid date";
  }

  const now = new Date();
  
  // Normalize both dates to midnight for comparison
  const normalizedDate = new Date(date); // Create a copy for normalization
  normalizedDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = now.getTime() - normalizedDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24); // Calculate difference in days

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  
  const timeString = date.toLocaleString('en-US', options); // Use original date for time formatting
  
  if (diffDays === 0) {
    return `Today, ${timeString}`;
  } else if (diffDays === 1) {
    return `Yesterday, ${timeString}`; // Include time for yesterday
  } else {
    return date.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + `, ${timeString}`;
  }
}
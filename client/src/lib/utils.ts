import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUptimeString = (
  days: number,
  hours: number,
  minutes: number
): string => {
  return `${days} days, ${hours} hours, ${minutes} minutes`;
};

export function createSnowflake() {
  return {
    x: Math.random() * 100, // random x position
    y: Math.random() * -100, // start at different heights above the viewport
    size: Math.random() * 20 + 8, // random size between 8-28px (larger)
    speed: Math.random() * 3 + 0.5, // varying speeds
    opacity: Math.random() * 0.8 + 0.2, // random opacity
    rotation: Math.random() * 360, // random initial rotation
    rotationSpeed: Math.random() * 3 - 1.5, // more varied rotation speed
  };
}

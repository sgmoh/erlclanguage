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
    y: -10, // start above the viewport
    size: Math.random() * 15 + 5, // random size between 5-20px
    speed: Math.random() * 2 + 1, // random speed for falling
    opacity: Math.random() * 0.7 + 0.3, // random opacity
    rotation: Math.random() * 360, // random initial rotation
    rotationSpeed: Math.random() * 2 - 1, // random rotation speed
  };
}

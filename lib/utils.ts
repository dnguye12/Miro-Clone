import { Camera, Color } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const COLORS = [
  "#DC2626", // Red
  "#D97706", // Orange
  "#059669", // Green
  "#7C3AED", // Purple
  "#DB2777", // Pink
  "#2563EB", // Blue
  "#10B981", // Emerald
  "#9333EA", // Violet
  "#FACC15", // Yellow
  "#3B82F6", // Light Blue
  "#EC4899", // Rose
  "#F43F5E", // Deep Rose
  "#4ADE80", // Light Green
  "#A855F7", // Light Purple
  "#FB923C", // Light Orange
  "#14B8A6", // Teal
  "#F87171", // Light Red
  "#60A5FA", // Sky Blue
  "#E879F9", // Magenta
  "#FBBF24"  // Gold
];

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  }
}

export function colorToCSS(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}
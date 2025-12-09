"use client";
import { MapPin } from "lucide-react";

interface TravelLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  showIcon?: boolean;
}

const SIZE_CLASSES = {
  sm: { container: "w-20 h-20", text: "text-[10px]", icon: 12 },
  md: { container: "w-32 h-32", text: "text-[14px]", icon: 16 },
  lg: { container: "w-48 h-48", text: "text-[18px]", icon: 24 },
  xl: { container: "w-64 h-64", text: "text-[24px]", icon: 32 },
} as const;

export default function TravelLoader({
  text = "Exploring the world...",
  size = "md",
  className = "",
  animated = true,
  showIcon = true,
}: TravelLoaderProps) {
  const { container, text: textSize, icon: iconSize } = SIZE_CLASSES[size];

  return (
    <div
      className={`flex flex-col items-center gap-4 ${className} justify-center min-h-screen`}
    >
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        @keyframes travel-beat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }

        .travel-icon {
          animation: travel-beat 1.5s ease-in-out infinite;
        }

        .fade-in-text {
          animation: fade-in-up 0.5s ease-out 0.5s both;
        }

        /* Disable animations when animated=false */
        .no-animation .pulse-ring,
        .no-animation .travel-icon,
        .no-animation .fade-in-text {
          animation: none;
        }
      `}</style>

      {/* Main Container */}
      <div className={`relative ${container} ${!animated ? "no-animation" : ""}`}>
        {/* Outer Pulsing Ring */}
        {animated && (
          <div className="pulse-ring absolute inset-0 rounded-full border-[3px] border-green-500" />
        )}

        {/* Static Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-green-500" />

        {/* Inner Icon */}
        <div className="absolute inset-[20%] flex items-center justify-center">
          {showIcon && (
            <div className={animated ? "travel-icon" : ""}>
              <MapPin className="text-green-500" size={iconSize} strokeWidth={2} />
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      {text && (
        <p
          className={`font-medium text-gray-600 text-center ${textSize} ${
            animated ? "fade-in-text" : ""
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

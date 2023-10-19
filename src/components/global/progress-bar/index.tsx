import { useEffect, useState } from "react";

interface CircularProgressBarProps {
    progress: number;
    size?: number;
    color?: string;
}

export const CircularProgressBar = ({
    progress,
    size = 12,
    color = "green-500",
}: CircularProgressBarProps) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const circumference = 2 * Math.PI * 50;
        const progressOffset = circumference - (progress / 100) * circumference;
        setOffset(progressOffset);
    }, [progress]);

    return (
        <svg className={`w-${size} h-${size}`}>
            <circle
                className="stroke-2"
                cx="50%"
                cy="50%"
                r="48%"
                fill="transparent"
            />
            <circle
                className={`stroke-${color} stroke-2 transition-all duration-500 ease-linear`}
                cx="50%"
                cy="50%"
                r="48%"
                strokeDasharray="100%"
                strokeDashoffset={offset}
                fill="transparent"
            />
            <text
                className="text-sm text-green-500 text-align-center"
                x="50%"
                y="50%"
            >
                {progress}%
            </text>
        </svg>
    );
};

export const LinearProgressBar = ({
    progress,
    barColor = "bg-teal-600",
}: {
    progress: number;
    barColor?: string;
}) => {
    return (
        <div className="w-full bg-gray-200 rounded-full relative">
            <div
                className={`${barColor}  text-center p-0.5 leading-none rounded-full`}
                style={{ width: `${progress}%` }}
            />
            <span className="absolute right-0 text-xs font-medium text-gray-700">
                {progress}%
            </span>
        </div>
    );
};

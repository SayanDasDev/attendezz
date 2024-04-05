"use client"

import {
    CircularProgress,
    CircularProgressIndicator,
    CircularProgressVal,
    CircularProgressSvg,
    CircularProgressTrace,
  } from "@/components/ui/circular-progress";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface AttendancePercentProps extends React.HTMLAttributes<HTMLDivElement> {
  hideValue?: boolean;
  progressValue: number;
}

const AttendancePercent: React.FC<AttendancePercentProps> = ({className, progressValue, hideValue}) => {
  const [value, setValue] = useState(0);

  const progressValueRef = useRef(progressValue);

  useEffect(() => {
    progressValueRef.current = progressValue;
  }, [progressValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        const newValue = Math.min(v + 1, progressValueRef.current);
        if (newValue === progressValueRef.current) {
          clearInterval(interval);
        }
        return newValue;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress className={cn("w-14 h-14", className)}>
        <CircularProgressSvg>
          <CircularProgressTrace 
          className={`
          stroke-warning/40 text-warning/10
          ${value > 80 && `stroke-success/40 text-success/10`}
          ${value < 60 && `stroke-destructive/40 text-destructive/10`}
          `}
          />
          <CircularProgressIndicator
            value={value}
            className={`
            stroke-warning
            ${value > 80 && `stroke-success`}
            ${value < 60 && `stroke-destructive`}
            `}
          />
        </CircularProgressSvg>
        {!hideValue && 
          <CircularProgressVal
            className={`
            text-warning
            ${value > 80 && `text-success`}
            ${value < 60 && `text-destructive`}
            `}
          >{value}%</CircularProgressVal>
        }
      </CircularProgress>
  )
}

export default AttendancePercent

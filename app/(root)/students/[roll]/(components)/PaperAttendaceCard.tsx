import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttendancePercent from "@/components/shared/AttendancePercent";
import React from "react";
import Link from "next/link";

interface PaperAttendaceCardProps {
  paper: string;
}

const PaperAttendaceCard: React.FC<PaperAttendaceCardProps> = ({ paper }) => {
  const attendace = Math.floor(Math.random() * 100);
  return (
    <Card
      className={`flex px-4 py-3 justify-between items-center bg-gradient-to-r from-primary/10 to-primary/5 shadow-primary/10 border border-primary/10`}
    >
      <p className="font-semibold text-lg">{paper}</p>
      <div className="flex justify-center">
        <AttendancePercent progressValue={attendace} />
      </div>
    </Card>
  );
};

export default PaperAttendaceCard;

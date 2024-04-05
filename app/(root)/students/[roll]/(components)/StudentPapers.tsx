import AttendancePercent from "@/components/shared/AttendancePercent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaperAttendaceCard from "./PaperAttendaceCard";
import React from "react";
import { cn } from "@/lib/utils";

interface StudentPapersProps extends React.HTMLAttributes<HTMLDivElement> {
  papers: string[];
}

const StudentPapers: React.FC<StudentPapersProps> = ({ className, papers }) => {
  return (
    <Card className={cn(`relative`, className)}>
      <CardHeader className="sticky top-0 bg-background z-10">
        <CardTitle className="text-2xl leading-none">Papers</CardTitle>
        <CardDescription className="leading-none">
          Attendace on each paper
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 pt-2">
        {papers.map((paper, index) => (
          <PaperAttendaceCard key={index} paper={paper} />
        ))}
      </CardContent>
    </Card>
  );
};

export default StudentPapers;

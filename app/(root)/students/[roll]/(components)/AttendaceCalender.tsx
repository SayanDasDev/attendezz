"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DayContentProps } from "react-day-picker";

const allpresentDays = [
  new Date(2024, 5, 8),
  new Date(2024, 5, 9),
  new Date(2024, 5, 15),
  new Date(2024, 1, 15),
  new Date(2024, 0, 15),
];
const somepresentDays = [
  new Date(2024, 4, 8),
  new Date(2024, 4, 9),
  new Date(2024, 0, 16),
  new Date(2024, 4, 15),
];
const allabsentDays = [
  new Date(2024, 3, 8),
  new Date(2024, 3, 9),
  new Date(2024, 0, 17),
  new Date(2024, 3, 15),
];
const holidays = [
  new Date(2024, 2, 8),
  new Date(2024, 2, 9),
  new Date(2024, 0, 18),
  new Date(2024, 2, 15),
];

interface AttendaceCalenderProps {
  papers: string[];
}

const AttendaceCalender: React.FC<AttendaceCalenderProps> = ({papers}) => {
  const content = "Place content for the popover here.";

  const CustomDayContent = ({ date }: DayContentProps) => (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild className="w-full h-full">
          <TooltipTrigger className="w-full h-full">
            {date.getDate()}
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>
          {date.toDateString()}
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent>
        {date.toDateString()}
        <p>{content}</p>
      </PopoverContent>
    </Popover>
  );

  return (
    <TooltipProvider>
      <div className="flex flex-grow flex-wrap justify-between">
        <SectionHeading className="w-fit" title="Attendance Calender" />
      </div>
      <Calendar
        showOutsideDays={false}
        numberOfMonths={6}
        className="rounded-md select-none"
        defaultMonth={new Date(2024, 0)}
        fromMonth={new Date(2024, 0)}
        toMonth={new Date(2024, 5)}
        modifiers={{
          allpresent: allpresentDays,
          somepresent: somepresentDays,
          allabsent: allabsentDays,
          holiday: holidays,
        }}
        modifiersClassNames={{
          allpresent: "allpresentStyle",
          somepresent: "somepresentStyle",
          allabsent: "allabsentStyle",
          holiday: "holidaysStyle",
        }}
        classNames={{
          month:
            "p-4 rounded-md !border bg-gradient-to-r from-primary/10 to-primary/20 shadow-primary/10 border border-primary/10 shadow",
          months:
            "grid grid-cols-3 max-[1500px]:grid-cols-2 max-[1000px]:grid-cols-1 gap-4",
          table: "mt-4 w-full border-collapse space-y-1",
          head_row: "justify-center text-center",
          row: "justify-center",
        }}
        components={{ DayContent: CustomDayContent }}
      />
    </TooltipProvider>
  );
};

export default AttendaceCalender;

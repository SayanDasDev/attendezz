import React from "react";
import { SelectItem } from "../ui/select";

const WeekSelect = () => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      {weekdays.map((weekday) => {
        return (
          <SelectItem className="h-9" key={weekday} value={weekday.toUpperCase()}>
            {weekday}
          </SelectItem>
        );
      })}
    </>
  );
};

export default WeekSelect;
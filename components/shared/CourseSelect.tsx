import React from "react";
import { SelectItem } from "@/components/ui/select";
import { TCourseData } from "@/types/types";

interface CourseSelectProps {
  courses: TCourseData[];
}

const CourseSelect: React.FC<CourseSelectProps> = ({ courses }) => {
  const courseObjects = courses.map((course: TCourseData) => ({
    value: course.courseId.toString(),
    label: course.courseName.concat(": ", course.subjectName),
  }));

  return (
    <>
      {courseObjects.map((course) => {
        return (
          <SelectItem
            className="h-9"
            key={course.value}
            value={course.value}
          >
            {course.label}
          </SelectItem>
        );
      })}
    </>
  );
};

export default CourseSelect;

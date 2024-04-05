import React from "react";
import AddCourses from "./AddCourses";
import AllCourses from "./AllCourses";
import { TCourseData } from "@/types/types";

interface CoursesWrapperProps {
  courses: TCourseData;
  isLoading: boolean;
}

const CoursesWrapper: React.FC<CoursesWrapperProps> = ({ courses, isLoading}) => {

  return (
    <>
      <AllCourses courses={courses} isLoading={isLoading} />
      <AddCourses />
    </>
  );
};

export default CoursesWrapper;
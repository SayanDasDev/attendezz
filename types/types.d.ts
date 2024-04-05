import { AuthUser, TUser } from "./auth";

export type TCourseData = {
  courseId: number;
  courseName: string;
  subjectName: string;
  createdAt: string;
  updatedAt: string;
};

export type TAllClassesData = {
  routineId: number;
  course: TCourseData;
  user: AuthUser;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TTodaysClassesData = {
  routineId: number;
  courseId: number;
  courseName: string;
  startTime: string;
  endTime: string;
};

export type TLocationsData = {
  locationId: number;
  markedAs: string;
  latitude: number;
  longitude: number;
  approximate_distance: number;
};

export type TLiveClassData = {
  currentClassId: number;
  attendanceDuration: number;
  location: TLocationsData;
  routine: TAllClassesData;
  startTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TEnrolledByCourse = {
  enrolledId: number,
  user: TUser,
  course: TCourseData,
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
};

export type TLiveClassStudentsData ={
  id: string;
  firstname: string;
  lastname: string;
}
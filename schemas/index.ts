import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "E-mail is required",
    })
    .email({
      message: "Please Enter a valid e-mail",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const onboardingSchema = z
  .object({
    firstname: z.string().min(1, {
      message: "First name is required",
    }),
    lastname: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z
      .string()
      .min(1, {
        message: "E-mail is required",
      })
      .email({
        message: "Please Enter a valid e-mail",
      }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirm: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const profileEditSchema = z.object({
  address: z.string().min(1, {
    message: "Address is required",
  }),
  collegeId: z.coerce
    .number()
    .refine((value) => value.toString().length <= 10, {
      message: "ID cannot have more than 10 digits",
    }),
  userId: z.string(),
  avatar: z.string(),
});

export const courseSchema = z.object({
  courseName: z.string().min(1, {
    message: "Course name is required",
  }),
  subjectName: z.string().min(1, {
    message: "Subject name is required",
  }),
});

export const classSchema = z.object({
  courseId: z.coerce.number(),
  userId: z.string(),
  dayOfWeek: z.string().min(1, {
    message: "Day of week is required",
  }),
  startTime: z.string().min(1, {
    message: "Start Time is required",
  }),
  endTime: z.string(),
});

export const locationSchema = z.object({
  markedAs: z
    .string()
    .min(1, {
      message: "Location name must have at least 1 character",
    })
    .max(30, {
      message: "Location name can have at most 30 characters",
    }),
  latitude: z.number(),
  longitude: z.number(),
  approximate_distance: z.coerce.number().min(5, {
    message: "Minimum radius must be 5m",
  }),
});


export const currentClassSetSchema = z.object({
  locationId: z.number(),
  routineId: z.number(),
  attendanceDuration: z.coerce.number().min(10, {
    message: "Minimum attendace marking duration must be 10 minutes",
  }),
})
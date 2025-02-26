import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const reviewSchema = z.object({
  isAnonymous: z.boolean(),
  fullName: z.string().optional(),
  institution: z.string().optional(),
  instructorRating: z.number().min(1).max(5),
  liked: z.string().min(1, "Please tell us what you liked"),
  disliked: z.string().min(1, "Please tell us what you disliked"),
  additional: z.string().optional(),
  recommendation: z.number().min(1).max(5),
  overallRating: z.number().min(1).max(5),
  type: z.enum(["youtube", "event"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;

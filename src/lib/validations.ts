import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const reviewSchema = z
  .object({
    isAnonymous: z.boolean(),
    type: z.enum(["youtube", "event"]),
    createdAt: z.date().optional(), // This will be set server-side, so it's optional in the schema
    code: z.string().optional(),
    institution: z.string().min(1, "Institution is required"),
    name: z.string().optional(),
    "rate-instructor": z.number().min(1, "Please rate the instructor").max(5),
    "workshop-like": z.string().min(1, "Please tell us what you liked"),
    "workshop-dislike": z.string().min(1, "Please tell us what you disliked"),
    "workshop-improve": z.string().optional(),
    "workshop-overall-rating": z
      .number()
      .min(1, "Please provide an overall rating")
      .max(5),
    "workshop-recommend": z
      .number()
      .min(1, "Please rate how likely you are to recommend")
      .max(5),
  })
  .superRefine((data, ctx) => {
    // If they are NOT anonymous, but the name is empty or missing, throw an error
    if (!data.isAnonymous && (!data.name || data.name.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full name is required when not anonymous",
        path: ["name"], // This tells React Hook Form to attach the error to the 'name' input
      });
    }
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;

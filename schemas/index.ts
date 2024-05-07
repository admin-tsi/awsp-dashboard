import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string(),
});

export const UserDetailsSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  role: z.string(),
  isverified: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
  age: z.date(),
  clientData: z.string(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  phone: z.string().min(6), // Assuming phone numbers should be at least 6 digits
});

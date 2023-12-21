import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
export const userRegisterSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
  })
  .and(
    z
      .object({
        password: z.string().min(6).max(100),
        password_confirmation: z.string().min(6).max(100),
      })
      .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
      })
  );

export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserRegister = z.infer<typeof userRegisterSchema>;
const permission = z.object({
  id: z.number(),
  name: z.string(),
  value: z.number(),
});
const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  confirmed_at: z.string().datetime().optional(),
  failed_attempts: z.number().optional(),
  locked_at: z.string().datetime().optional(),
  active: z.boolean().optional(),
  name: z.string(),
  jti: z.string(),
  permissions: permission.array(),
});
export type Permission = z.infer<typeof permission>;
export type User = z.infer<typeof userSchema>;

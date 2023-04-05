import { z } from "zod";

export const registerUserInput = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string"
    })
    .min(3, { message: "First name must be 3 or more characters long" })
    .max(18, { message: "First name must be 18 or fewer characters long" }),

  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string"
    })
    .min(3, { message: "Last name must be 3 or more characters long" })
    .max(18, { message: "Last name must be 18 or fewer characters long" }),

  userName: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string"
    })
    .min(3, { message: "Last name must be 3 or more characters long" })
    .max(18, { message: "Last name must be 18 or fewer characters long" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "email must be a string"
    })
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
    .min(3, { message: "Password must be 3 or more characters long" })
});

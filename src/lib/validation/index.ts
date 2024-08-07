import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Name is too short"}).max(100, {message: "Name is too long"}),
    username: z.string().min(2, {message: "Username is too short"}),
    email: z.string().min(3, {message: "Email is too short"}),
    password: z.string().max(8, {message: "Password must be at least 8 characters"}),
});
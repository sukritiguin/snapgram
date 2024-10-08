import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Name is too short"}).max(100, {message: "Name is too long"}),
    username: z.string().min(2, {message: "Username is too short"}),
    email: z.string().min(3, {message: "Email is too short"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
});

export const SigninValidation = z.object({
    email: z.string().min(3, {message: "Email is too short"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
});

export const PostValidation = z.object({
    caption: z.string().min(5).max(2020),
    files: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string()
});
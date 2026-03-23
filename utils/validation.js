import{z}from 'zod';

const registerSchema=z.object({
    name:z.string().min(3,"Name mustt be at least 3 chars long"),

    email: z.string().email("Invalid email"),
    passoword: z.string().min(6,"Password must be at least 6 chars")

})

const loginSchema= z.object({
    email :z.string().email("Invalid email"),
    password: z.string().min(6,"Password required"),

})

const noteSchema=z.object({
title: z.string().min(1,"Title is required").max(100,"Toooo long"),
content: z.string().min(1,"content cannot be empty"),

})

export {registerSchema,loginSchema,noteSchema};
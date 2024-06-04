import { z } from "zod"

export const signUpSchema = z.object({
    email : z.string().email(),
    password : z.string(),
    name : z.string().optional()
})

export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string()
})

export const createBlogSchema = z.object({
    title : z.string(),
    content : z.string(),
    id : z.number()
})

export const updateBlogSchema = z.object({
    title : z.string(),
    content : z.string()
})


export type updateBlogTypes = z.infer<typeof updateBlogSchema>
export type createBlogType = z.infer<typeof createBlogSchema>
export type signinTypes = z.infer<typeof signinSchema>
export type signUPTypes = z.infer<typeof signUpSchema>
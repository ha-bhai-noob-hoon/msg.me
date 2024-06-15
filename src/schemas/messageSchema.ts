import {z} from 'zod'

export const messageSchemas = z.object({
    content: z
    .string()
    .min(10, {message: 'content must be more than 10 char'})
    .max(300, {message: "content must be less than 300 words"})    
})
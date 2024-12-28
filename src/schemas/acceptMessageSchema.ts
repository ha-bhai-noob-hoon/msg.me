import {z} from 'zod'

export const acceptedMessageSchema = z.object({
    acceptedMessage : z.boolean(),
    
})
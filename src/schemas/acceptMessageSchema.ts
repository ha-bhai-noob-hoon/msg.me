import {z} from 'zod'

export const acceptedMessageSchemas = z.object({
    acceptedMessage : z.boolean(),
    
})
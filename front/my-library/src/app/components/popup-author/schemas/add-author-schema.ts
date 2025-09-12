import {z} from 'zod';

export const authorSchema = z.object({
  firstname: z.string()
    .trim()
    .min(1, 'Firstname must have at least 1 character')
    .max(255, 'Firstname can not be greater than 255 characters'),
  lastname: z.string()
    .trim()
    .min(1, 'Lastname must have at least 1 character')
    .max(255, 'Lastname can not be greater than 255 characters'),
})

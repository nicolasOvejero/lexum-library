import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title must have at least 1 character')
    .max(255, 'Title can not be greater than 255 characters'),
  authors: z.array(z.string(), { message: 'Authors must be an array' }),
  publishDate: z.coerce
    .date({ message: 'Publish date can not be after today' }).max(new Date()),
  summary: z.string()
    .trim()
    .min(1, 'Summary must have at least 1 character')
    .max(3000, 'Summary can not be greater than 3000 characters'),
  nbPages: z.number()
    .min(1, 'A book have at least 1 page'),
});

import { z } from 'zod';
import {Author} from '../../authors/author.interface';

export const bookSchema = z.object({
  title: z.string().min(1).max(255),
  authors: z.string(),
  publishDate: z.coerce.date(),
  summary: z.string().min(1).max(3000),
  nbPages: z.number().min(1),
});

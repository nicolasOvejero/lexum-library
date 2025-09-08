import { Author } from '../authors/author.interface';

export type Book = {
  id: string;
  title: string;
  authors: Author[];
  publishDate: Date;
  summary: string;
  nbPages: number;
}

export interface Publication {
  category: string;
  id?: string;
  title: string;
  url: string;
  urlImg: string;
  content: string;
  origin: string;
  published: boolean;
  featured: boolean;
  order?: number;
  fac?: string;
}

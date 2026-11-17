export interface MicroCmsPost {
  id: string
  title: string
  content: string
  createdAt: string
  categories: { id: string; name: string }[]
  thumbnail: {url: string; height: number; width: number}
} 

export type Response = {
  contents: MicroCmsPost[];
}

export type PostDetail = MicroCmsPost;

export type Form = {
  name: string;
  email: string;
  message: string;
}

export type ValiData = {
  name?: string;
  email?: string;
  message?: string;
}
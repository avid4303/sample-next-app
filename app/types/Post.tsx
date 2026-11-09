export type Post = {
  id: number;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  title: string;
  content: string;
};

export type Response = {
  posts: Post[];
};

export type PostDetail = {
  message: string;
  post: Post;
}

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
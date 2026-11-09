import { BASE_URL } from "../constans"
import type { PostDetail } from "../types/Post";

export const getPostDetailApi = async (id: string): Promise<PostDetail> => {
  //APIの取得
  const res = await fetch(`${BASE_URL}/dev/posts/${id}`);

  //404,505の判定
  if(!res.ok){
    throw new Error("API request failed"); 
  }

  return res.json();
}

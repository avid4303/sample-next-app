import { BASE_URL } from "../../../constans"
import type { PostDetail } from "../../../types/Post";

export const getPostDetailApi = async (id: string): Promise<PostDetail> => {
  //APIの取得
  const res = await fetch(`https://9kendouqvn.microcms.io/api/v1/posts/${id}`,{
    headers: {
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
    },
  },);

  //404,505の判定
  if(!res.ok){
    throw new Error("API request failed"); 
  }

  return res.json();
}

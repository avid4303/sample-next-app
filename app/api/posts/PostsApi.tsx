import { BASE_URL } from "../../constans";
import type { Response } from "../../types/Post";

export const getPostApi = async(): Promise<Response> => {

  //APIの取得
  const res = await fetch(`https://9kendouqvn.microcms.io/api/v1/posts`,{
    headers: {
      'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
    },
  })

  //404,505の判定
  if(!res.ok){
    throw new Error("API request failed");
  }

  return res.json();
}
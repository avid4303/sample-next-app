import { BASE_URL } from "../constans";
import { Response } from "../types/Post";

export const getPostApi = async(): Promise<Response> => {
  //APIの取得
  const res = await fetch(`${BASE_URL}/dev/posts`);

  //404,505の判定
  if(!res.ok){
    throw new Error("API request failed");
  }

  return res.json();
}
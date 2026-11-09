import { Response } from "../types/Post";

export const getPostApi = async(): Promise<Response> => {
  //APIの取得
  const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");

  //404,505の判定
  if(!res.ok){
    throw new Error("API request failed");
  }

  return res.json();
}
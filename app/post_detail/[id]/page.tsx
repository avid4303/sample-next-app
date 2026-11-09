"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { getPostDetailApi } from "../../api/PostDetailApi";

import type { Post } from "../../types/Post";

import LoadingMessage from "../../_components/common/LoadingMessage";
import ErrorMessage from "../../_components/common/ErrorMessage";

export default function PostDetail(){

  const { id } = useParams<{id: string}>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  //API
  useEffect(() => {
    const getPostDetail = async () => {

      //idが存在しない場合
      if (!id) return;

      //読み込み
      setLoading(true);
      setError("");

      try{
        // 記事idを指定して詳細記事を取得
        const data = await getPostDetailApi(id);
        setPost(data.post);

      }catch(err){
        // API通信エラーをstateに保存
        setError("記事情報が取得できませんでした。");

      }finally{
        // API通信終了後にローディングを終了
        setLoading(false);
      }
    };

    getPostDetail();
  },[id]);



  /* 
  レンダリング処理
  */

  // 記事情報取得時の画面
  if(loading){
    return <LoadingMessage />
  }

  // 記事情報取得失敗の画面
  if(error){
    return <ErrorMessage />
  }

  // 記事データが存在しない場合
  if (post === null) {
    return <ErrorMessage />;
  }

  return(

    /*
    記事詳細表示 
    ➀：記事画像
    ➁：投稿日
    ➂：カテゴリー
    ➃：タイトル
    ➄：本文
    ➅：記事一覧へ遷移
    */

    <div className="max-w-[800px] mx-auto pt-6 px-4 pb-12 flex flex-col gap-4">
      {/* ➀ */}
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-auto"
        loading="eager"
      />

      <div className="flex flex-wrap items-center gap-2">
        {/* ➁ */}
        <time className="text-[0.95rem] text-gray-600" dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {/* ➂ */}
        <div className="flex flex-wrap gap-[6px]">
          {post.categories.map(categori => (
            <span className="py-1 px-2 rounded-full bg-gray-200 text-gray-700 text-[.8rem]" key={categori}>
              {categori}
            </span>
          ))}
        </div>
      </div>
      {/* ➃ */}
      <h1 className="m-0 text-[1.8rem] font-extrabold text-gray-900">{post.title}</h1>

      {/* ➄ */}
      <div className="whitespace-pre-wrap"
       dangerouslySetInnerHTML={{ __html: post.content.trim(), }}/>
        
      {/* ➅ */}
      <div className="mt-4">
        <Link href="/" className="text-blue-600 no-underline font-semibold hover:underline">記事一覧へ戻る</Link>
      </div>
    </div>
  );
}



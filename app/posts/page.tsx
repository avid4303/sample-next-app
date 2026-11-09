"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { Post } from '../types/Post';
import { getPostApi } from '../api/PostsApi';

import  LoadingMessage  from '../_components/common/LoadingMessage';
import  ErrorMessage  from '../_components/common/ErrorMessage';

export default function Posts() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  //API
  useEffect(() => {

    const getPosts = async () => {

      //読み込み
      setLoading(true);
      setError("");

      try{
        //APIの呼び出し
        const data = await getPostApi();
        //コンポーネントの更新
        setPosts(data.posts);

      //エラー処理
      }catch(err){
        setError("記事の取得に失敗しました。");

      //読み込み終了
      }finally{
        setLoading(false);
      }
    }

    getPosts();
  },[]);

  /* 
  レンダリング処理
  */

  //記事一覧取得中の画面
  if(loading){
    return <LoadingMessage />
  }

  //記事一覧取得失敗の画面
  if(error){
    return <ErrorMessage />
  }

  return (

    /* 
    記事一覧取得後の画面
    ➀：記事画像
    ➁：投稿日
    ➂：カテゴリー
    ➃：タイトル
    ➄：本文
    */

    <div>
      <h1 className="mb-4 text-[1.4rem] font-bold text-gray-900">記事一覧</h1>
      {posts.map(post =>(

        <Link href={`/PostDetail/${post.id}`} key={post.id}>
          <article  key={post.id} className="grid grid-cols-[200px_1fr] gap-4 py-4 border-b border-gray-200">
            {/* ➀ */}
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={300}
              height={120}
              className="w-full h-auto"
              loading="eager"
            />

            <div className="flex flex-col gap-2">
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
                    <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-[0.85rem]" key={categori}>
                      {categori}
                    </span>
                  ))}
                </div>
              </div>

              {/* ➃ */}
              <h2 className="m-0 text-[1.15rem] font-bold">{post.title}</h2>

              {/* ➄ */}
              <div className="m-0 text-gray-700 leading-[1.6] line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.content }}/>

            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
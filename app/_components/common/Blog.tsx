import Link from "next/link";

export default function Blog(){
  return(
    <div className="text-white no-underline font-semibold">
      <Link href="/" className="header-link">Blog</Link>
    </div>
  )
}
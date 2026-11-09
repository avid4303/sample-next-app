import Link from "next/link";

export default function Inquiry(){
  return(
    <div className="text-white no-underline font-semibold">
      <Link href="/Inquiry" className="header-link">お問い合わせ</Link>
    </div>
  )
}
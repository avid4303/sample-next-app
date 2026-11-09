import Blog from "../common/Blog";
import Inquiry from "../common/Inquiry";

export default function Header (){
  return(
    <header className="bg-[#333] flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Blog />
      <Inquiry />
    </header>
  );
}
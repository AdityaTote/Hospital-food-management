import Navbar from "@/components/Navbar";
import Link from "next/link";

interface LoginLinkProps {
  href: string;
  text: string;
}

function LoginLink({ href, text }: LoginLinkProps) {
  return (
    <Link
      href={href}
      className={"bg-slate-800 hover:text-gray-500 rounded-md w-36 h-12 flex justify-center items-center"}
    >
      <h1>{text}</h1>
    </Link>
  );
}

export default function Home() {
  return (
    <div className={"bg-slate-200 h-screen"}>
      <Navbar />
      <div
        className={
          "flex items-center justify-center pt-20 font-serif font-medium"
        }
      >
        <h1 className={"text-4xl"}>Welcome to Hospital Food Management</h1>
      </div>
      <div className="flex flex-col items-center justify-center pt-20 space-y-4 text-lg text-white">
        <LoginLink href="/admin/login" text="Food Admin" />
        <LoginLink href="/pantry/login" text="Pantry Staff" />
        <LoginLink href="/delivey/login" text="Delivery Agent" />
      </div>
    </div>
  );
}

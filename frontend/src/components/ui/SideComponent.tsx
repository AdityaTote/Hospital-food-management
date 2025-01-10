import Link from "next/link";

interface SideComponentProps {
    text: string;
    link: string;
}

export default function SideComponent({text, link}: SideComponentProps) {
  return (
    <Link href={link}  className="flex items-center gap-6 py-2 px-8 hover:bg-gray-700 hover:cursor-pointer">
      <div className={`text-md`}>{text}</div>
    </Link>
  );
}
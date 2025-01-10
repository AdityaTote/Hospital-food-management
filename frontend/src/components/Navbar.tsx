import Link from "next/link";

export default function Navbar() {
    return(
        <div className="w-screen h-16 bg-gray-800 text-white flex items-center justify-between px-6">
            <h1 className="md:text-2xl sm:text-xl text-lg font-semibold">Hospital Food Management</h1>
            <div className="flex space-x-4 md:text-base sm:text-sm text-xs">
                <Link href={"/admin/login"} className={"hover:text-gray-300"}>
                <h1>Food Admin</h1>
                </Link>
                <Link href={"/pantry/login"} className={"hover:text-gray-300"}>
                <h1>Pantry Staff</h1>
                </Link>
                <Link href={"/delivery/login"} className={"hover:text-gray-300"}>
                <h1>Delivery Agent</h1>
                </Link>
            </div>
        </div>
    )
}
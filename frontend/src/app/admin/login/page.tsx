import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { BACKEND_URL } from "@/config";

export default function AdminLogin(){
    return(
        <div className="h-screen bg-slate-200">
            <Navbar/>
            <div className="flex items-center justify-center mt-40">
            <Login heading="Food Admin Login" url={`${BACKEND_URL}/admin/login`} path="admin/dashboard"/>
            </div>
        </div>
    )
}
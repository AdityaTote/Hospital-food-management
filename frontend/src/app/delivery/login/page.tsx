import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { BACKEND_URL } from "@/config";

export default function AdminLogin(){
    return(
        <div className="h-screen bg-slate-200">
            <Navbar/>
            <div className="flex items-center justify-center mt-40">
            <Login heading="Delivery Agent  Login" url={`${BACKEND_URL}/delivery/login`} path="delivery/dashboard"/>
            </div>
        </div>
    )
}
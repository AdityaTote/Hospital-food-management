"use client"
import { useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginProps {
    heading: string;
    url: string;
    path: string;
}

export default function Login({heading, url, path}: LoginProps) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value as string;
        const password = passwordRef.current?.value as string;

        if(!email || !password){
            alert("Please fill all the fields");
            return;
        }

        const res = await axios.post(url, {
            email: email,
            password: password
        })

        if(!res){
            alert("Invalid credentials");
            return;
        }

        router.push(path)

    }

    return (
        <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center lg:text-2xl md:text-xl sm:text-base text-sm font-bold">{heading}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 lg:text-xl md:text-base sm:text-sm text-xs">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email"  placeholder="example@mail.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password"  placeholder="Enter your password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleSubmit}>Login</Button>
        </CardFooter>
      </Card>
    );
}
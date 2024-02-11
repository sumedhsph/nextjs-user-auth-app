"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });
  const [err, setErr] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const onLogin = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      console.log('Login successful', response.data);
      router.push("/profile")
    } catch (error:any) {
      console.log(error);
      setErr(error.message)
      toast.error("login failed", error.message);
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="h-screen place-items-center place-content-center  flex flex-col">
      <div className="prose">
        <h1>Login</h1>
      </div>
      <form onSubmit={onLogin}>
        <div className="form-control mt-6">
          <label className="label" htmlFor="email">
            *Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="input input-md input-bordered input-primary w-full max-w-xs"
            autoComplete="on"
          />
        </div>

        <div className="form-control mt-2">
          <label className="label" htmlFor="password1">
            *Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="input input-md input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="form-control mt-6 mb-6">
          <button className="btn btn-primary btn-wide">Login</button>
        </div>
        <p>{err && err}</p>
        <Link
            href="/login"
            className="inline-block align-middle hover:text-slate-100"
          >
            Signup here <FaCircleArrowRight className="inline-block" />
          </Link>
      </form>
    </div>
  );
}

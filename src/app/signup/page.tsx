"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    password2: ""
  });
  const [err, setErr] = useState("Plese enter all fields");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      //setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
    } catch (error: any) {
      console.log(error);
      toast.error("Signup failed", error.message);
    } finally {
      //setLoading(false);
      toast.success("Signup successfull");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 8 &&
      user.password2.length > 8
    ) {
      if (user.password !== user.password2) {
        setButtonDisabled(true);
        setErr("Passwords does not match");
      } else {
        setButtonDisabled(false);
        setErr("Plese enter all fields");
      }
    } else {
      setButtonDisabled(true);
      setErr("Plese enter all fields");
    }
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Toaster />
      <div className="h-screen place-items-center place-content-center  flex flex-col">
        <div className="prose">
          <h1>Sign Up</h1>
        </div>
        <div>
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
              *Password <sub>min 8 characters</sub>
            </label>
            <input
              name="password1"
              id="password1"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="input input-md input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control mt-2">
            <label className="label" htmlFor="password2">
              *Confirm Password
            </label>
            <input
              name="password2"
              id="password2"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setUser({ ...user, password2: e.target.value })}
              className="input input-md input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="form-control mt-6 mb-6">
            <button
              className="btn btn-primary btn-wide"
              disabled={buttonDisabled}
              onClick={onSignUp}
            >
              {buttonDisabled ? `${err}` : "Signup"}
            </button>
          </div>

          <Link
            href="/login"
            className="inline-block align-middle hover:text-slate-100"
          >
            Login here <FaCircleArrowRight className="inline-block" />
          </Link>
        </div>
      </div>
    </>
  );
}

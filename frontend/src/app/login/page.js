"use client";

import { useEffect, useState } from "react";
import { getUser, login } from "../lib/AuthService";
import { useRouter } from "next/navigation";
import ShowPassword from "@/components/ShowPassword";

export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (user) {
      if (user.role === "user") {
        router.push(`users/${user.id}`);
      } else {
        router.push("/");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    login(data, router);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_35%),linear-gradient(135deg,#f8fbff_0%,#eef2ff_45%,#fff1f5_100%)] flex items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-16 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -right-16 bottom-12 h-56 w-56 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-fuchsia-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/25">
            L
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sign in to continue to your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              value={password}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20 pr-10"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <ShowPassword show={show} setshow={setshow} />
          </div>
          <button
            type="submit"
            className="group w-full cursor-pointer rounded-2xl bg-linear-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            <span className="inline-flex items-center justify-center gap-2">
              Login
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

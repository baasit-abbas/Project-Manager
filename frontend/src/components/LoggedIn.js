"use client";
import { getUser } from "@/app/lib/AuthService";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const LoggedIn = () => {
  const router = useRouter();
  useEffect(() => {
    const loadData = async () => {
        const user = getUser()
      if (!user) {
        router.push("/login");
      }
      if (user.role !== "admin") {
        router.push(`/users/${user.id}`);
      }
    };
    loadData()
  }, []);

  return null;
};

export default LoggedIn;

"use client";
import { useEffect } from "react";
import { getUser } from "./lib/AuthService";
import { useRouter } from "next/navigation";


export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const user = getUser();
      if (!user) {
        router.push("/login");
      }
      if (user.role === "user") {
        router.push(`/users/${user.id}`);
      }
      else{
        router.push('/admin')
      }
    };

    loadData();
  }, []);

  

  return (
    <div></div>

  );
}

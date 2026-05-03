"use client";
import { useEffect } from "react";
import { getUser, IsLoggedIn } from "./lib/AuthService";
import { useRouter } from "next/navigation";


export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      if (!IsLoggedIn()) {
        router.push("/login");
      }
      const user = getUser();
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

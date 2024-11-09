'use client'
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";

export default  function Home() {

  const session =  useSession()
  console.log(session)

  return (
    <h1>home</h1>
  );
}


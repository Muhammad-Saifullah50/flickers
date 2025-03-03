
import AuthForm from "@/components/forms/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signin to your account account',
}

export default async function SignInPage({ searchParams }: { searchParams: { callbackUrl: string } }) {

  const {callbackUrl} = await searchParams;
  return (
    <AuthForm
      callbackUrl={callbackUrl}
      type="signin" />
  )
}


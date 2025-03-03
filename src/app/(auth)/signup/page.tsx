import AuthForm from "@/components/forms/AuthForm"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup to create your account',
}

export default async function SignUpPage({ searchParams }: { searchParams: { callbackUrl: string } }) {

const {callbackUrl} = await searchParams;

  return (
    <AuthForm
      callbackUrl={callbackUrl}
      type="signup" />
  )
}


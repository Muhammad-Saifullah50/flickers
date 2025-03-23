import AuthForm from "@/components/forms/AuthForm"
import { toast } from "@/hooks/use-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup to create your account',
}

export default async function SignUpPage({ searchParams }: { searchParams: { callbackUrl: string, error: string } }) {

const {callbackUrl, error} = await searchParams;

if (error === 'OAuthAccountNotLinked') {
  toast({
    variant: 'destructive',
    title: 'The email you are trying to use is already linked to another account. Try logging in through that authentication provider'
  })
}

  return (
    <AuthForm
      callbackUrl={callbackUrl}
      type="signup" />
  )
}


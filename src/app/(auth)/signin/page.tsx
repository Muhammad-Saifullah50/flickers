
import AuthForm from "@/components/forms/AuthForm";
import { toast } from "@/hooks/use-toast";
import { Metadata } from "next";
import { PageProps } from "../../../../.next/types/app/(auth)/signin/page";

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signin to your account account',
}

export default async function SignInPage({ searchParams }: PageProps) {

  const usableParams = await (searchParams);


  if (usableParams.error === 'OAuthAccountNotLinked') {
    toast({
      variant: 'destructive',
      title: 'The email you are trying to use is already linked to another account. Try logging in through that authentication provider'
    })
  }
  return (
    <AuthForm
      callbackUrl={usableParams.callbackUrl}
      type="signin" />
  )
}


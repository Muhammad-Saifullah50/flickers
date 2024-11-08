
import AuthForm from "@/components/AuthForm"

export default async function SignInPage({ searchParams }: { searchParams: { callbackUrl: string } }) {

  const {callbackUrl} = await searchParams;
  return (
    <AuthForm
      callbackUrl={callbackUrl}
      type="signin" />
  )
}


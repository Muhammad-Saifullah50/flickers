
import AuthForm from "@/components/AuthForm"

export default async function SignInPage({ searchParams }: { searchParams: { callbackUrl: string } }) {
  return (
    <AuthForm
      callbackUrl={searchParams?.callbackUrl}
      type="signin" />
  )
}


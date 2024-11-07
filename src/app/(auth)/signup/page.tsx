import AuthForm from "@/components/AuthForm"

export default async function SignUpPage({ searchParams }: { searchParams: { callbackUrl: string } }) {
  return (
    <AuthForm
      callbackUrl={searchParams?.callbackUrl}
      type="signup" />
  )
}


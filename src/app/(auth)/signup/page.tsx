import AuthForm from "@/components/forms/AuthForm"

export default async function SignUpPage({ searchParams }: { searchParams: { callbackUrl: string } }) {

const {callbackUrl} = await searchParams;

  return (
    <AuthForm
      callbackUrl={callbackUrl}
      type="signup" />
  )
}



import AuthForm from "@/components/AuthForm"

export default async function SignInPage() {

  return (
    <AuthForm
      callbackUrl={'/'}
      type="signin" />
  )
}


import { signOut } from "@/lib/auth"

export function SignoutBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo: "/signin"})
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}
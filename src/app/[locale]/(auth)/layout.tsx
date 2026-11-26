import { AuthLayout } from "@/features/auth/server"

export default function AuthGroupLayout({
  children,
}: LayoutProps<"/[locale]">) {
  return <AuthLayout>{children}</AuthLayout>
}
